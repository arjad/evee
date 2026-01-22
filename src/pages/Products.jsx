import React, { useState } from 'react';
import DataTable from '../components/DataTable';
import { Link } from 'react-router-dom';
import Filter from "../components/Filter"
import {Product_columns, Product_Data} from '../MockData';

const Products = () => {
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
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
          <h2 className="text-2xl font-black text-emerald-900 uppercase">
            Products Catalog
          </h2>
        <div className="flex gap-3">
          <button
            onClick={() => toggleFilters()}
            className="px-6 py-2.5 bg-white border border-emerald-600 text-emerald-700 font-black text-[10px] uppercase rounded-xl"
          >
            Filters
          </button>
          <Link to="/products/create">
            <button className="px-6 py-2.5 bg-emerald-600 text-white font-black text-[10px] uppercase rounded-xl">
              New Product
            </button>
          </Link>
        </div>
      </div>
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out transform ${
          isFilterOpen ? 'max-h-96 opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-4'
        }`}
      >  <Filter
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

      <DataTable columns={Product_columns} data={Product_Data} />
    </div>
  );
};

export default Products;
