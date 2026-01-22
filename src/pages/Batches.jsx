import React, { useState, useMemo } from 'react';
import DataTable from '../components/DataTable';
import Filter from "../components/Filter";
import Stats from '../components/GeneralStats';
import { BATCHES, BatchStats, Batch_columns } from '../MockData.jsx';
import Heading from '../components/TopHeading.jsx';

const Batches = () => {
  const [filter, setFilter] = useState('');
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
  const clearFilters = () => {
    setDateFilter('THIS_MONTH');
    setFromDate('');
    setToDate('');
    setStatusFilter([]);
  };

  const filteredData = useMemo(() => 
    BATCHES.filter(b =>
      b.batchNumber.toLowerCase().includes(filter.toLowerCase()) ||
      b.productName.toLowerCase().includes(filter.toLowerCase()) ||
      b.sku.toLowerCase().includes(filter.toLowerCase())
    ), [filter]
  );

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Heading
        title="Batches"
        toggleFilters={toggleFilters}
        newButtonLink="/demands/create"
        newButtonText="New Batch"
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

      <Stats stats={BatchStats}/>

      <DataTable columns={Batch_columns} data={filteredData} />
    </div>
  );
};

export default Batches;
