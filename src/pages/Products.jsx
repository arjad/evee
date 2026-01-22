import React, { useState } from 'react';
import DataTable from '../components/DataTable';
import { Link } from 'react-router-dom';
import Filter from "../components/Filter"
const Products = () => {
  const columns = [
    { key: 'picture', header: 'Image', sortable: false }, // <- add this
    { key: 'sku', header: 'SKU Code', sortable: true },
    { key: 'item', header: 'Item Name', sortable: true },
    { key: 'category', header: 'Category', sortable: true },
    { key: 'size', header: 'Size', sortable: true },
    { key: 'modal', header: 'Modal', sortable: true },
    { key: 'unit_price', header: 'Unit Price', sortable: true },

  ];
  
  const initialData = [
    {
      id: 1,
      picture: 'https://picsum.photos/50?random=2',
      sku: 'INV-001',
      item: 'Ethernet Hub v4',
      category: 'Hardware',
      manager: 'Sarah Chen',
      size: "samll",
      modal: 'Low',
      unit_price: '200',
    },
    {
      id: 2,
      picture: 'https://picsum.photos/50?random=2',
      sku: 'INV-002',
      item: 'Fiber Patch Cable',
      category: 'Cabling',
      manager: 'Mark Wilson',
      stockLevel: 12,
      priority: 'High',
      lastUpdated: '10m ago',
    },
  ];
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [dateFilter, setDateFilter] = useState('THIS_MONTH');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [statusFilter, setStatusFilter] = useState([]);
  const toggleFilters = () => {
    setIsFilterOpen(prev => {
      if (prev) {
        // panel is closing → clear filters
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
      
      {/* Header */}
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
      {isFilterOpen && (
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
)}

      <DataTable columns={columns} data={initialData} />
    </div>
  );
};

export default Products;
