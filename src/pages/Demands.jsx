import React, { useState, useMemo } from 'react';
import DataTable from '../components/DataTable';
import { Link } from 'react-router-dom';
import Filter from "../components/Filter";
import { MOCK_DEMANDS,DemandStats, DemandChart, Demand_columns } from '../MockData';
import Stats from '../components/GeneralStats';
import Heading from "../components/TopHeading";

const Demands = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [dateFilter, setDateFilter] = useState('THIS_MONTH');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [statusFilter, setStatusFilter] = useState([]);
  const toggleFilters = () => {
    setIsFilterOpen(prev => {
      if (prev) {
        clearFilters();
      }
      return !prev;
    });
  };
  
  const filteredDemands = useMemo(() => {
    const now = new Date();
    return MOCK_DEMANDS.filter(d => {
      const created = new Date(d.createdAt);
      let dateMatch = true;

      if (dateFilter === 'TODAY') {
        dateMatch = created.toDateString() === now.toDateString();
      }

      if (dateFilter === 'THIS_WEEK') {
        const weekAgo = new Date();
        weekAgo.setDate(now.getDate() - 7);
        dateMatch = created >= weekAgo;
      }

      if (dateFilter === 'THIS_MONTH') {
        dateMatch =
          created.getMonth() === now.getMonth() &&
          created.getFullYear() === now.getFullYear();
      }

      if (dateFilter === 'CUSTOM' && fromDate && toDate) {
        dateMatch =
          created >= new Date(fromDate) &&
          created <= new Date(toDate);
      }

      const statusMatch =
        statusFilter.length === 0 || statusFilter.includes(d.status);

      return dateMatch && statusMatch;
    });
  }, [dateFilter, fromDate, toDate, statusFilter]);

  const clearFilters = () => {
    setDateFilter('THIS_MONTH');
    setFromDate('');
    setToDate('');
    setStatusFilter([]);
  };

  return (
    <div className="space-y-6">
      <Heading
        title="Demand Records"
        toggleFilters={toggleFilters}
        newButtonLink="/demands/create"
        newButtonText="New Demand"
      />

      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out transform ${
          isFilterOpen ? 'max-h-96 opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-4'
        }`}
      >
        <Filter
          dateFilter={dateFilter}
          setDateFilter={setDateFilter}
          fromDate={fromDate}
          setFromDate={setFromDate}
          toDate={toDate}
          setToDate={setToDate}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />
      </div>
      
      <Stats stats={DemandStats} chartData={DemandChart} chartType="bar" />

      <DataTable columns={Demand_columns} data={filteredDemands} />
    </div>
  );
};

export default Demands;
