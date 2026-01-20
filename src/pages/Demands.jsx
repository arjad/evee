import React, { useState } from 'react';
import DataTable from '../components/DataTable';

const Demands = () => {
  const [filter, setFilter] = useState('');

  // MOCK DATA
  const MOCK_DEMANDS = [
    { id: 'DM-001', title: 'Raw Material Procurement', createdBy: 'Admin', status: 'PENDING', priority: 'HIGH' },
    { id: 'DM-002', title: 'Packaging Box Order', createdBy: 'Operations', status: 'PROCESSING', priority: 'MEDIUM' },
    { id: 'DM-003', title: 'Label Printing Request', createdBy: 'Marketing', status: 'COMPLETED', priority: 'LOW' },
    { id: 'DM-004', title: 'Inventory Restock', createdBy: 'Warehouse', status: 'PENDING', priority: 'HIGH' },
  ];

  const filteredDemands = MOCK_DEMANDS.filter(d =>
    d.title.toLowerCase().includes(filter.toLowerCase()) ||
    d.id.toLowerCase().includes(filter.toLowerCase()) ||
    d.createdBy.toLowerCase().includes(filter.toLowerCase())
  );

  // Columns definition for DataTable
  const columns = [
    { key: 'id', header: 'Demand ID', sortable: true },
    { key: 'title', header: 'Title', sortable: true },
    { key: 'createdBy', header: 'Created By', sortable: true },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: (val) => (
        <span
          className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border ${
            val === 'PENDING'
              ? 'bg-amber-50 text-amber-700 border-amber-100'
              : val === 'PROCESSING'
              ? 'bg-blue-50 text-blue-700 border-blue-100'
              : 'bg-emerald-50 text-emerald-700 border-emerald-100'
          }`}
        >
          {val}
        </span>
      ),
    },
    {
      key: 'priority',
      header: 'Priority',
      sortable: true,
      render: (val) => (
        <span
          className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border ${
            val === 'HIGH'
              ? 'bg-rose-50 text-rose-700 border-rose-100'
              : val === 'MEDIUM'
              ? 'bg-amber-50 text-amber-700 border-amber-100'
              : 'bg-emerald-50 text-emerald-700 border-emerald-100'
          }`}
        >
          {val}
        </span>
      ),
    },
    // New Actions column
    {
      key: 'actions',
      header: 'Actions',
      render: (_, row) => (
        <button
          className="px-3 py-1 bg-emerald-600 text-white text-xs rounded-lg hover:bg-emerald-700 transition-all"
        >
          View Details
        </button>
      ),
    },
  ];
  
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-2 h-6 bg-emerald-500 rounded-full" />
            <h2 className="text-2xl font-black text-emerald-900 uppercase tracking-tight">
              Demand Records
            </h2>
          </div>
          <p className="text-emerald-600 font-bold text-[10px] uppercase tracking-widest ml-5">
            Operational Pipeline Monitoring
          </p>
        </div>

        {/* Search & Button */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <input
              type="text"
              placeholder="SEARCH DEMANDS..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="pl-10 pr-4 py-2.5 bg-white border border-emerald-100 rounded-xl text-xs font-bold uppercase tracking-widest focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all w-64 shadow-sm"
            />
            <svg
              className="w-4 h-4 absolute left-3 top-3 text-emerald-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          <button className="px-6 py-2.5 bg-emerald-600 text-white font-black text-[10px] uppercase tracking-widest rounded-xl shadow-lg shadow-emerald-200 hover:bg-emerald-700 active:scale-[0.98] transition-all whitespace-nowrap">
            New Demand +
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Demands', val: MOCK_DEMANDS.length, color: 'emerald' },
          { label: 'Pending', val: MOCK_DEMANDS.filter(d => d.status === 'PENDING').length, color: 'amber' },
          { label: 'Processing', val: MOCK_DEMANDS.filter(d => d.status === 'PROCESSING').length, color: 'blue' },
          { label: 'High Priority', val: MOCK_DEMANDS.filter(d => d.priority === 'HIGH').length, color: 'rose' },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-2xl border border-emerald-100 shadow-sm"
          >
            <p className={`text-[10px] font-black uppercase tracking-widest opacity-60 mb-1 ${
              stat.color === 'emerald' ? 'text-emerald-800' :
              stat.color === 'amber' ? 'text-amber-800' :
              stat.color === 'blue' ? 'text-blue-800' :
              'text-rose-800'
            }`}>
              {stat.label}
            </p>
            <p className="text-3xl font-black text-slate-900">{stat.val}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <DataTable columns={columns} data={filteredDemands} />

      {/* Footer */}
      <p className="text-center text-[10px] font-bold text-emerald-800 uppercase tracking-[0.2em] opacity-30 py-4">
        Terminal Session 0x02FF • Encrypted Connection • Data Sync Active
      </p>
    </div>
  );
};

export default Demands;
