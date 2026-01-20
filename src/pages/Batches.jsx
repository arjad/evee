import React, { useState, useMemo } from 'react';
import DataTable from '../components/DataTable';

const MOCK_BATCHES = [
  { id: 'B-1001', batchNumber: 'LOT-2024-001', arrivalDate: '2024-05-20', productName: 'High-Tensile Steel Rods', sku: 'ST-992', quantity: 1200, unit: 'Units', status: "BatchStatus.ARRIVED", warehouseLocation: 'ZONE-A1' },
  { id: 'B-1002', batchNumber: 'LOT-2024-002', arrivalDate: '2024-05-21', productName: 'Premium Resin Pellets', sku: 'RS-442', quantity: 500, unit: 'Kg', status: "BatchStatus.IN_TRANSIT", warehouseLocation: 'BAY-04' },
  { id: 'B-1003', batchNumber: 'LOT-2024-003', arrivalDate: '2024-05-19', productName: 'Industrial Sealant X', sku: 'SL-001', quantity: 85, unit: 'Barrels', status: "BatchStatus.QC_PENDING", warehouseLocation: 'LAB-SEC' },
  { id: 'B-1004', batchNumber: 'LOT-2024-004', arrivalDate: '2024-05-22', productName: 'Aluminum Sheets', sku: 'AL-550', quantity: 3000, unit: 'Sheets', status: "BatchStatus.ARRIVED", warehouseLocation: 'ZONE-C2' },
  { id: 'B-1005', batchNumber: 'LOT-2024-005', arrivalDate: '2024-05-20', productName: 'Eco-Fiber Padding', sku: 'FB-221', quantity: 250, unit: 'Bales', status: "BatchStatus.REJECTED", warehouseLocation: 'QUARANTINE' },
  { id: 'B-1006', batchNumber: 'LOT-2024-006', arrivalDate: '2024-05-23', productName: 'Circuit Board Assemblies', sku: 'CB-900', quantity: 5000, unit: 'Pcs', status: "BatchStatus.STORED", warehouseLocation: 'ZONE-E5' },
];

const Batches = () => {
  const [filter, setFilter] = useState('');

  const filteredData = useMemo(() => 
    MOCK_BATCHES.filter(b =>
      b.batchNumber.toLowerCase().includes(filter.toLowerCase()) ||
      b.productName.toLowerCase().includes(filter.toLowerCase()) ||
      b.sku.toLowerCase().includes(filter.toLowerCase())
    ), [filter]
  );

  const stats = useMemo(() => [
    { label: 'Total Batches', val: MOCK_BATCHES.length, color: 'emerald' },
    { label: 'QC Pending', val: 'amber' },
    { label: 'In Transit', val: 'blue' },
    { label: 'Rejected', val: 'rose' },
  ], []);

  const columns = [
    { key: 'batchNumber', header: 'Batch ID', sortable: true },
    { key: 'productName', header: 'Product Name', sortable: true, render: (val, item) => (
      <div>
        <div className="font-bold text-slate-900">{val}</div>
        <div className="text-[9px] text-emerald-600 font-bold uppercase tracking-wider">{item.sku}</div>
      </div>
    )},
    { key: 'arrivalDate', header: 'Arrival Date', sortable: true },
    { key: 'quantity', header: 'Quantity', sortable: true, render: (val, item) => (
      <div className="font-black text-slate-800">
        {val.toLocaleString()} <span className="text-[10px] font-bold text-slate-400 uppercase">{item.unit}</span>
      </div>
    )},
    { key: 'Price', header: 'Unit Price', sortable: true, render: val => (
      <span className="font-mono bg-slate-100 px-2 py-0.5 rounded text-[10px] font-bold border border-slate-200">{val}</span>
    )},
    { key: 'status', header: 'Status', sortable: true, render: val => {
        const styles = {
          ARRIVED: 'bg-emerald-50 text-emerald-700 border-emerald-100',
          IN_TRANSIT: 'bg-blue-50 text-blue-700 border-blue-100',
          QC_PENDING: 'bg-amber-50 text-amber-700 border-amber-100',
          REJECTED: 'bg-rose-50 text-rose-700 border-rose-100',
          STORED: 'bg-slate-50 text-slate-700 border-slate-100',
        };
        return (
          <span className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase border ${styles[val]}`}>
            {val.replace('_', ' ')}
          </span>
        );
      }
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-2 h-6 bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
            <h2 className="text-2xl font-black text-emerald-900 uppercase tracking-tighter">
              Batch Manifests
            </h2>
          </div>
          <p className="text-emerald-600 font-bold text-[10px] uppercase tracking-widest ml-5">
            Logistics Arrival & Inventory Sourcing
          </p>
        </div>

        {/* Search + New Button */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <input
              type="text"
              placeholder="SEARCH BATCHES/SKU..."
              value={filter}
              onChange={e => setFilter(e.target.value)}
              className="pl-10 pr-4 py-2.5 bg-white border border-emerald-100 rounded-xl text-xs font-bold uppercase tracking-widest focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all w-64 shadow-sm"
            />
            <svg className="w-4 h-4 absolute left-3 top-3 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          <button className="px-6 py-2.5 bg-emerald-600 text-white font-black text-[10px] uppercase tracking-widest rounded-xl shadow-lg shadow-emerald-200 hover:bg-emerald-700 active:scale-[0.98] transition-all whitespace-nowrap">
            Log New Arrival +
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-emerald-100 shadow-sm hover:shadow-md transition-shadow group relative overflow-hidden">
            <div className={`absolute top-0 right-0 w-16 h-16 opacity-5 -mr-4 -mt-4 rounded-full ${
              stat.color === 'emerald' ? 'bg-emerald-500' :
              stat.color === 'amber' ? 'bg-amber-500' :
              stat.color === 'blue' ? 'bg-blue-500' :
              'bg-rose-500'
            }`} />
            <p className={`text-[10px] font-black uppercase tracking-widest opacity-60 mb-1 ${
              stat.color === 'emerald' ? 'text-emerald-800' :
              stat.color === 'amber' ? 'text-amber-800' :
              stat.color === 'blue' ? 'text-blue-800' :
              'text-rose-800'
            }`}>
              {stat.label}
            </p>
            <p className="text-3xl font-black text-slate-900 group-hover:scale-110 transition-transform origin-left">{stat.val}</p>
          </div>
        ))}
      </div>

      {/* Data Table */}
      <DataTable columns={columns} data={filteredData} />

      {/* Footer */}
      <div className="pt-4 border-t border-emerald-50 mt-12">
        <div className="flex justify-between items-center text-[9px] font-bold text-emerald-800 uppercase tracking-widest opacity-40">
          <span>Warehouse Node: HK-ALPHA-09</span>
          <span>Sync Status: 100% Validated</span>
          <span>Session UID: WMS_8822_XPR</span>
        </div>
      </div>
    </div>
  );
};

export default Batches;
