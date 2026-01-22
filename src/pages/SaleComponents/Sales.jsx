import React, { useState, useMemo } from 'react';
import DataTable from '../../components/DataTable';
import { Link } from 'react-router-dom';
import Filter from "../../components/Filter";
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';

import { 
  User, 
  MapPin, 
  Calendar,
  MessageSquare,
  Send,
  CheckCircle2,
  Clock,
  ArrowLeft,
  Info
} from 'lucide-react';
/* ---------------- MOCK DATA ---------------- */
const MOCK_SALES = [
  {
    id: 'SL-001',
    customer: 'Alpha Traders',
    invoiceNo: 'INV-1201',
    serviceCenter: 'Karachi',
    amount: 125000,
    status: 'PAID',
    createdAt: '2026-01-21',
  },
  {
    id: 'SL-002',
    customer: 'Beta Stores',
    invoiceNo: 'INV-1202',
    serviceCenter: 'Lahore',
    amount: 98000,
    status: 'PENDING',
    createdAt: '2026-01-20',
  },
  {
    id: 'SL-003',
    customer: 'Gamma Enterprises',
    invoiceNo: 'INV-1203',
    serviceCenter: 'Islamabad',
    amount: 154500,
    status: 'OVERDUE',
    createdAt: '2026-01-19',
  },
  {
    id: 'SL-004',
    customer: 'Delta Mart',
    invoiceNo: 'INV-1204',
    serviceCenter: 'Karachi',
    amount: 67000,
    status: 'PAID',
    createdAt: '2026-01-18',
  },
];

const MOCK_DEMAND = {
    id: 'DM-001',
    title: 'Raw Material Procurement - Batch Q4',
    status: 'PENDING',
    createdAt: '2023-11-20 09:45 AM',
    createdBy: 'Admin User',
    serviceCenter: 'Karachi Central Hub',
    manager: 'Sarah Johnson',
    products: [
      { id: 'PRD-101', name: 'Lithium-Ion Battery Cell', sku: 'LI-BC-2000', quantity: 500, unitPrice: 12.5, category: 'Electronics' },
      { id: 'PRD-102', name: 'Aluminium Frame Rail', sku: 'AL-FR-55', quantity: 120, unitPrice: 45, category: 'Structural' },
      { id: 'PRD-103', name: 'Control Unit PCB', sku: 'CU-PCB-V2', quantity: 50, unitPrice: 85, category: 'Electronics' },
      { id: 'PRD-104', name: 'Motor Housing', sku: 'MH-X1', quantity: 45, unitPrice: 110, category: 'Mechanical' },
    ],
    remarksHistory: [
      { author: 'Admin User', message: 'Urgently needed for the upcoming assembly phase.', timestamp: '2023-11-20 09:50 AM' }
    ]
  };
/* ---------------- HELPER ---------------- */
const AVAILABLE_PRODUCTS = [
    { name: 'Lithium-Ion Battery Cell', sku: 'LI-BC-2000', defaultPrice: 12.50, img: 'https://picsum.photos/40' },
    { name: 'Aluminium Frame Rail', sku: 'AL-FR-55', defaultPrice: 45.00, img: 'https://picsum.photos/40' },
    { name: 'Control Unit PCB', sku: 'CU-PCB-V2', defaultPrice: 85.00, img: 'https://picsum.photos/40' },
    { name: 'Motor Housing', sku: 'MH-X1', defaultPrice: 110.00, img: 'https://picsum.photos/40' },
    { name: 'Tire Set (14-inch)', sku: 'TR-14-SET', defaultPrice: 150.00, img: 'https://picsum.photos/40' },
    { name: 'Brake Pad Assembly', sku: 'BRK-PAD-01', defaultPrice: 35.00, img: 'https://picsum.photos/40' },
  ];
/* ---------------- COMPONENT ---------------- */
const Sales = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [dateFilter, setDateFilter] = useState('THIS_MONTH');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [statusFilter, setStatusFilter] = useState([]);

  
  const productOptions = AVAILABLE_PRODUCTS.map(item => ({
    value: item.name,
    label: (
      <div className="flex items-center gap-2">
        <img src={item.img} alt={item.name} className="w-6 h-6 object-cover rounded" />
        <span>{item.name}</span>
      </div>
    ),
    sku: item.sku,
    defaultPrice: item.defaultPrice,
  }));

  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedSale, setSelectedSale] = useState(null);
  const [demand, setDemand] = useState(MOCK_DEMAND);
  const [newRemark, setNewRemark] = useState('');
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1); // goes back to previous page
    // OR navigate('/demands') if you want to go to a specific route
  };
  const calculateTotal = () => {
    return demand.products.reduce((acc, curr) => acc + (curr.quantity * curr.unitPrice), 0);
  };
  const toggleFilters = () => {
    setIsFilterOpen(prev => {
      if (prev) clearFilters();
      return !prev;
    });
  };

  /* ---------------- FILTER LOGIC ---------------- */
  const filteredSales = useMemo(() => {
    const now = new Date();

    return MOCK_SALES.filter(sale => {
      const created = new Date(sale.createdAt);
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
        statusFilter.length === 0 || statusFilter.includes(sale.status);

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
    { key: 'id', header: 'Sale ID', sortable: true },
    { key: 'invoiceNo', header: 'Invoice #', sortable: true },
    { key: 'customer', header: 'Customer', sortable: true },
    { key: 'serviceCenter', header: 'Service Center', sortable: true },
    {
      key: 'amount',
      header: 'Amount',
      sortable: true,
      render: val => `Rs. ${val.toLocaleString()}`,
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: val => (
        <span
          className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border ${
            val === 'PAID'
              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
              : val === 'PENDING'
              ? 'bg-amber-50 text-amber-700 border-amber-200'
              : 'bg-rose-50 text-rose-700 border-rose-200'
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
      render: (_, row) => (
        <button
          onClick={() => {
            setSelectedSale(row);
            setIsViewOpen(true);
          }}
          className="px-3 py-1 text-xs font-bold border border-emerald-600 text-emerald-700 rounded-lg hover:bg-emerald-50"
        >
          View Details
        </button>
      ),
    },
  ];

 const [products, setProducts] = useState([{ id: 'row-1', name: '', sku: '', quantity: 1, unitPrice: 0 }]);
  const [formInfo, setFormInfo] = useState({
    createdBy: 'Admin User',
    serviceCenter: 'Karachi Central Hub',
    manager: 'Sarah Johnson',
    date: new Date().toISOString().split('T')[0],
  });
  const [remarks, setRemarks] = useState('');
  const updateProduct = (id, field, value) => {
    setProducts(products.map(p => {
      if (p.id === id) {
        let updated = { ...p, [field]: value };
        if (field === 'name') {
          const selected = AVAILABLE_PRODUCTS.find(item => item.name === value);
          if (selected) {
            updated.sku = selected.sku;
            updated.unitPrice = selected.defaultPrice;
          } else {
            updated.sku = '';
            updated.unitPrice = 0;
          }
        }
        return updated;
      }
      return p;
    }));
  };
  const addProductRow = () => {
    setProducts([...products, { id: `row-${Date.now()}`, name: '', sku: '', quantity: 1, unitPrice: 0 }]);
  };

  const removeProductRow = (id) => {
    if (products.length > 1) setProducts(products.filter(p => p.id !== id));
  };
  const handleAddRemark = (e) => {
    e.preventDefault();
    if (!newRemark.trim()) return;

    const remark = {
      author: 'Current Manager',
      message: newRemark,
      timestamp: new Date().toLocaleString(),
    };

    setDemand(prev => ({
      ...prev,
      remarksHistory: [...prev.remarksHistory, remark]
    }));
    setNewRemark('');
  };
  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black text-emerald-900 uppercase">
          Sales Records
        </h2>

        <div className="flex gap-3">
          <button
            onClick={toggleFilters}
            className="px-6 py-2.5 bg-white border border-emerald-600 text-emerald-700 font-black text-[10px] uppercase rounded-xl"
          >
            Filters
          </button>

            <button onClick={()=>setIsViewOpen(true)} className="px-6 py-2.5 bg-emerald-600 text-white font-black text-[10px] uppercase rounded-xl">
              New Sale +
            </button>
        </div>
      </div>

      {/* Filter Panel */}
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
          { label: 'Total Sales', val: MOCK_SALES.length },
          { label: 'Paid', val: MOCK_SALES.filter(s => s.status === 'PAID').length },
          { label: 'Pending', val: MOCK_SALES.filter(s => s.status === 'PENDING').length },
          { label: 'Overdue', val: MOCK_SALES.filter(s => s.status === 'OVERDUE').length },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-2xl border border-emerald-100 shadow-sm"
          >
            <p className="text-[10px] font-black uppercase opacity-60 mb-1">
              {stat.label}
            </p>
            <p className="text-3xl font-black text-slate-900">{stat.val}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <DataTable columns={columns} data={filteredSales} />
{/* View Details Modal */}
{isViewOpen && selectedSale && (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
    onClick={() => setIsViewOpen(false)}
  >
    {/* Modal Box */}
    <div
      className="bg-white rounded-3xl w-[95%] max-w-6xl max-h-[90vh] overflow-y-auto p-6 relative"
      onClick={(e) => e.stopPropagation()}
    >  <div className="flex items-center gap-4">
    <h2 className="text-2xl font-black text-emerald-900 uppercase">
        Sale / {122}
    </h2>
    </div>
    <div 
                  className="flex absolute top-4 right-4 items-center gap-2 px-4 py-2"
>

         <button 
                 className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"

              onClick={()=> {window.print()}}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
            </button>
      {/* Close Button */}
      <button
        onClick={() => setIsViewOpen(false)}
        className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
      >
        ✕
      </button>
</div>
      <div className="grid py-2">


        {/* Right Section */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl py-2 shadow-sm">
      {/* Form Info */}
      <div className="grid grid-cols-1 py-3 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Requested By', value: formInfo.createdBy, field: 'createdBy' },
          { label: 'Service Center', value: formInfo.serviceCenter, field: 'serviceCenter' },
          { label: 'Manager', value: formInfo.manager, field: 'manager' },
          { label: 'Date', value: formInfo.date, field: 'date', type: 'date' }
        ].map((info, i) => (
          <div key={i} className="flex flex-col">
            <label className="text-xs font-black uppercase text-gray-400">{info.label}</label>
            <input
              type={info.type || 'text'}
              value={info.value}
              onChange={e => setFormInfo({...formInfo, [info.field]: e.target.value})}
              className="mt-1 p-2 border rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
            />
          </div>
        ))}
      </div>


      {/* Products Table */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-visible">
      <table className="w-full text-left">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-xs font-black text-gray-400 uppercase tracking-wider">Product</th>
              <th className="px-6 py-3 text-xs font-black text-gray-400 uppercase tracking-wider">SKU</th>
              <th className="px-6 py-3 text-xs font-black text-gray-400 uppercase tracking-wider">Quantity</th>
              <th className="px-6 py-3 text-xs font-black text-gray-400 uppercase tracking-wider">Unit Price</th>
              <th className="px-6 py-3 text-xs font-black text-gray-400 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-xs font-black text-gray-400 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {products.map(p => (
              <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-3">
                  <Select
                    options={productOptions}
                    value={productOptions.find(opt => opt.value === p.name)}
                    onChange={(selected) => updateProduct(p.id, 'name', selected.value)}
                    className="w-full text-sm"
                    classNamePrefix="select"
                    isSearchable
                  />
                </td>
                <td className="px-6 py-3 text-sm">{p.sku}</td>
                <td className="px-6 py-3">
                  <input
                    type="number"
                    min="1"
                    value={p.quantity}
                    onChange={e => updateProduct(p.id, 'quantity', parseInt(e.target.value))}
                    className="w-20 p-1 border rounded-lg text-sm"
                  />
                </td>
                <td className="px-6 py-3">
                  <input
                    type="number"
                    step="0.01"
                    value={p.unitPrice}
                    onChange={e => updateProduct(p.id, 'unitPrice', parseFloat(e.target.value))}
                    className="w-24 p-1 border rounded-lg text-sm"
                  />
                </td>
                <td className="px-6 py-3 text-sm font-bold text-emerald-700">
                  ${(p.quantity * p.unitPrice).toFixed(2)}
                </td>
                <td className="px-6 py-3">
                  <button type="button" onClick={() => removeProductRow(p.id)} className="text-red-600 text-xs font-bold">Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-emerald-50/40 border-t-2 border-emerald-100">
            <tr>
              <td colSpan={4} className="px-6 py-3 text-right text-xs font-black uppercase text-gray-600">Total</td>
              <td className="px-6 py-3 font-bold text-emerald-800">${calculateTotal().toFixed(2)}</td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>
      <button type="button" onClick={addProductRow} className="px-4 py-2 my-3 bg-gray-50 border border-gray-200 rounded-lg text-sm font-bold hover:bg-gray-100 transition">Add Product</button>

      {/* Remarks */}
      <div>
        <label className="block text-xs font-black uppercase text-gray-400">Remarks</label>
        <textarea
          value={remarks}
          onChange={e => setRemarks(e.target.value)}
          className="w-full mt-2 p-3 border rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none resize-none text-sm"
          placeholder="Enter any internal notes or comments..."
          rows={4}
        />
      </div>

      <button type="button"  className="px-4 py-2 my-3 bg-gray-50 border border-gray-200 rounded-lg text-sm font-bold hover:bg-gray-100 transition">SAVE</button>

          </div>
        </div>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default Sales;
