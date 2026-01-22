import React, { useState } from 'react';
import DataTable from '../components/DataTable';
import Filter from "../components/Filter";
import { Product_columns, Product_Data } from '../MockData';
import Heading from '../components/TopHeading';
import { MOCK_DEMANDS,DemandStats, Demand_columns } from '../MockData';
// import Stats from '../components/GeneralStats';

const Products = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [dateFilter, setDateFilter] = useState('THIS_MONTH');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [statusFilter, setStatusFilter] = useState([]);

  const toggleFilters = () => {
    setIsFilterOpen(prev => {
      if (prev) clearFilters();
      return !prev;
    });
  };

  const clearFilters = () => {
    setDateFilter('THIS_MONTH');
    setFromDate('');
    setToDate('');
    setStatusFilter([]);
  };

  return (
    <div className="space-y-6">
      <Heading
        title="Products Catalog"
        toggleFilters={toggleFilters}
        newButtonLink="/products/create"
        newButtonText="New Product"
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

      {/* <Stats stats={DemandStats}/> */}

      <DataTable columns={Product_columns} data={Product_Data} />
    </div>
  );
};

export default Products;
