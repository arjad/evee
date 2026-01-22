import React, { useState, useMemo } from 'react';
import DataTable from '../components/DataTable';
import { Link } from 'react-router-dom';
import Filter from "../components/Filter";
/* ---------------- MOCK DATA ---------------- */
const MOCK_DEMANDS = [
  {
    id: 'DM-001',
    title: 'Raw Material Procurement',
    createdBy: 'Admin',
    serviceCenter: 'Karachi',
    status: 'PENDING',
    createdAt: '2026-01-21',
  },
  {
    id: 'DM-002',
    title: 'Packaging Box Order',
    createdBy: 'Operations',
    serviceCenter: 'Lahore',
    status: 'DISPATCHED',
    createdAt: '2026-01-20',
  },
  {
    id: 'DM-003',
    title: 'Label Printing Request',
    createdBy: 'Marketing',
    serviceCenter: 'Islamabad',
    status: 'RECEIVED',
    createdAt: '2026-01-19',
  },
  {
    id: 'DM-004',
    title: 'Inventory Restock',
    createdBy: 'Warehouse',
    serviceCenter: 'Karachi',
    status: 'PENDING',
    createdAt: '2026-01-18',
  },
];

/* ---------------- COMPONENT ---------------- */
const Demands = () => {
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
  
  /* ---------------- FILTER LOGIC ---------------- */
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

  /* ---------------- CLEAR FILTERS ---------------- */
  const clearFilters = () => {
    setDateFilter('THIS_MONTH');
    setFromDate('');
    setToDate('');
    setStatusFilter([]);
  };

  /* ---------------- TABLE COLUMNS ---------------- */
  const columns = [
    { key: 'id', header: 'Demand ID', sortable: true },
    { key: 'title', header: 'Title', sortable: true },
    { key: 'createdBy', header: 'Created By', sortable: true },
    { key: 'serviceCenter', header: 'Service Center', sortable: true },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: val => (
        <span
          className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border ${
            val === 'PENDING'
              ? 'bg-amber-50 text-amber-700 border-amber-200'
              : val === 'DISPATCHED'
              ? 'bg-blue-50 text-blue-700 border-blue-200'
              : 'bg-emerald-50 text-emerald-700 border-emerald-200'
          }`}
        >
          {val}
        </span>
      ),
    },
    { key: 'createdAt', header: 'Date', sortable: true },

    {
      key: 'actions',
      header: 'Actions',
      render: () => (
<Link
  to={`/demands/view`} // or your dynamic view path
  className="px-3 py-1 text-xs font-bold border border-emerald-600 text-emerald-700 rounded-lg hover:bg-emerald-50"
>
  View Details
</Link>
      ),
    },
  ];

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
          <h2 className="text-2xl font-black text-emerald-900 uppercase">
            Demand Records
          </h2>

        <div className="flex gap-3">
          <button
            onClick={() => toggleFilters()}
            className="px-6 py-2.5 bg-white border border-emerald-600 text-emerald-700 font-black text-[10px] uppercase rounded-xl"
          >
            Filters
          </button>
          <Link to="/demands/create">
            <button className="px-6 py-2.5 bg-emerald-600 text-white font-black text-[10px] uppercase rounded-xl">
              New Demand +
            </button>
          </Link>
        </div>
      </div>

      {/* INLINE FILTER PANEL */}
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

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Demands', val: MOCK_DEMANDS.length, color: 'emerald' },
          { label: 'Pending', val: MOCK_DEMANDS.filter(d => d.status === 'PENDING').length, color: 'amber' },
          { label: 'Processing', val: 0, color: 'blue' },
          { label: 'High Priority', val: 0, color: 'rose' },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-2xl border border-emerald-100 shadow-sm"
          >
            <p className={`text-[10px] font-black uppercase tracking-widest opacity-60 mb-1 ${
              stat.color === 'emerald'
                ? 'text-emerald-800'
                : stat.color === 'amber'
                ? 'text-amber-800'
                : stat.color === 'blue'
                ? 'text-blue-800'
                : 'text-rose-800'
            }`}>
              {stat.label}
            </p>
            <p className="text-3xl font-black text-slate-900">{stat.val}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <DataTable columns={columns} data={filteredDemands} />
    </div>
  );
};

export default Demands;
