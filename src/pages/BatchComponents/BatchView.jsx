import React, { useState } from 'react';
import { 
  User, 
  MapPin, 
  CheckCircle2,
  Clock,
  ArrowLeft,
  Ship,
  Info
} from 'lucide-react';
import { 
  Globe, 
  Calendar,
  MessageSquare,
  Send,
  PackageCheck,
  Hash,
  Anchor,
  Box,
  Weight,
  Layers,
  ChevronRight
} from 'lucide-react';

import { useNavigate } from 'react-router-dom';
import {MOCK_BATCH, MOCK_PRODUCTS} from '../../MockData.jsx';

import { 
  X,
  Printer,
} from 'lucide-react'
// --- Mock Data ---

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
const batch = {
  origin: 'China',
  carrier: 'Oceanic Express',
  destination: 'Karachi Central Hub',
};


const Badge = ({ status }) => {
  const styles = {
    PENDING: 'bg-orange-100 text-orange-600 border-orange-200',
    DISPATCHED: 'bg-blue-100 text-blue-600 border-blue-200',
    RECEIVED: 'bg-emerald-100 text-emerald-600 border-emerald-200',
    CANCELLED: 'bg-red-100 text-red-600 border-red-200',
    MEDIUM: 'bg-amber-100 text-amber-600 border-amber-200',
    LOW: 'bg-slate-100 text-slate-600 border-slate-200',
  };

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${styles[status] || styles.LOW}`}>
      {status}
    </span>
  );
};


// --- Main Component ---

const BatchView = () => {
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
  // State
  const [newProduct, setNewProduct] = useState(null);
  const [newQuantity, setNewQuantity] = useState('');

  // Method
  const handleAddProductRow = () => {
    if (!newProduct || !newQuantity) return;

    const productToAdd = {
      ...newProduct,
      quantity: Number(newQuantity),
    };

    setDemand(prev => ({
      ...prev,
      products: [...prev.products, productToAdd]
    }));

    setNewProduct(null);
    setNewQuantity('');
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
      {/* Breadcrumbs & Top Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-black text-emerald-900 uppercase">
              Batches / {demand.id}
          </h2>
          <Badge status={demand.status} />
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={handleBack}
            className="px-4 py-2 hover:text-black rounded-lg font-bold text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm"
          >
            <ArrowLeft size={16} />
            Back
          </button>
          <button
              className="h-10 w-10 flex items-center justify-center rounded-2xl bg-slate-100 text-slate-600 hover:bg-emerald-50 hover:text-emerald-600 transition-all shadow-sm"
              title="Print Claim"
          >
            <Printer size={15} />
          </button>
          <button 
            className="h-10 w-10 flex items-center justify-center rounded-2xl bg-slate-100 text-slate-600 hover:bg-emerald-50 hover:text-emerald-600 transition-all shadow-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
          </button>
          <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg font-bold hover:bg-emerald-700 shadow-lg shadow-emerald-600/20 transition-all flex items-center gap-2 text-sm">
            <CheckCircle2 size={16} />
            Approve Batch
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-1 md:p-10 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 flex flex-col md:flex-row items-stretch justify-between gap-6 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-[0.03] rotate-12 pointer-events-none">
               <Globe size={200} />
             </div>

             {/* Origin Terminal */}
             <div className="flex-1 p-2 text-center md:text-left z-10">
                <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-2">Point of Origin</p>
                <h4 className="text-xl font-black text-slate-800 tracking-tight leading-tight">{batch.origin}</h4>
                <p className="text-[10px] font-bold text-emerald-500 mt-2 uppercase flex items-center gap-2 justify-center md:justify-start">
                   <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                   China Hub Terminal
                </p>
             </div>

             {/* Transit Connector */}
             <div className="flex-[0.5] flex flex-col items-center justify-center gap-2 px-2 z-10 py-4 md:py-0">
                <div className="w-full h-1.5 bg-slate-100 rounded-full relative flex items-center">
                    <div className="absolute left-0 w-3 h-3 rounded-full bg-slate-300"></div>
                    <div className="absolute right-0 w-3 h-3 rounded-full bg-[#EA580B]"></div>
                    <div className="absolute left-[65%] w-12 h-12 bg-[#FFEDD5] rounded-full flex items-center justify-center shadow-xl transform -translate-x-1/2">
                        <Ship size={24} className="text-[#EA580B]" />
                    </div>
                </div>
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-5">{batch.carrier}</p>
             </div>

             {/* Destination Terminal */}
             <div className="flex-1 p-2 text-center md:text-right z-10">
                <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-2">Target Destination</p>
                <h4 className="text-xl font-black text-slate-800 tracking-tight leading-tight">{batch.destination}</h4>
                <p className="text-[10px] font-bold text-slate-400 mt-2 uppercase flex items-center gap-2 justify-center md:justify-end">
                   Warehouse Distribution
                   <div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div>
                </p>
             </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b flex items-center justify-between bg-gray-50/30">
              <h3 className="font-black text-gray-800 tracking-tight text-sm uppercase">Incoming Inventory Items</h3>
            </div>

            {/* Add Product Row */}
            <div className="px-6 py-4 border-b bg-gray-50/20 flex items-center gap-3">
              <select
                value={newProduct?.id || ''}
                onChange={(e) => {
                  const prod = MOCK_PRODUCTS.find(p => p.id === e.target.value);
                  setNewProduct(prod);
                  setNewQuantity('');
                }}
                className="flex-1 p-2 border rounded"
              >
                <option value="">Select Product</option>
                {MOCK_PRODUCTS.map((p) => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>

              <input
                type="text"
                readOnly
                placeholder="SKU"
                value={newProduct?.sku || ''}
                className="w-32 p-2 border rounded bg-gray-100"
              />

              <input
                type="number"
                placeholder="Quantity"
                value={newQuantity || ''}
                onChange={(e) => setNewQuantity(e.target.value)}
                className=" p-2 border rounded"
              />

              <span className="w-32 text-right font-bold">
                {newProduct ? `$${(newProduct.unitPrice * (newQuantity || 0)).toFixed(2)}` : '$0.00'}
              </span>

              <button
                onClick={handleAddProductRow}
                className="px-4 py-2 bg-emerald-600 text-white rounded-lg font-bold text-xs"
              >
                Save
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50/50">
                    <th className="px-6 py-3 text-[10px] font-black text-gray-400 uppercase tracking-widest">Product Details</th>
                    <th className="px-6 py-3 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Quantity</th>
                    <th className="px-6 py-3 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Unit Price</th>
                    <th className="px-6 py-3 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Total Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {demand.products.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center bg-gray-50 border">
                            <img
                              src={`https://picsum.photos/40`} 
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          <div>
                            <div className="text-sm font-bold text-gray-900">{product.name}</div>
                            <div className="text-[10px] text-gray-400 font-bold tracking-widest uppercase">{product.sku}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-sm font-bold text-gray-700">{product.quantity}</span>
                      </td>
                      <td className="px-6 py-4 text-right font-medium text-gray-600 text-sm">
                        ${product.unitPrice.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 text-right font-bold text-emerald-700 text-sm">
                        ${(product.quantity * product.unitPrice).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </td>
                      {/* DELETE BUTTON */}
                      <td className="px-4 py-4 text-center">
                        <button
                          onClick={() => {
                            setDemand(prev => ({
                              ...prev,
                              products: prev.products.filter(p => p.id !== product.id)
                            }));
                          }}
                          className="text-red-600 hover:text-red-800"
                          title="Delete Product"
                        >
                          <X size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>

                <tfoot>
                  <tr className="bg-emerald-50/40 border-t-2 border-emerald-100">
                    <td colSpan={3} className="px-6 py-5 text-right font-black text-gray-600 uppercase tracking-widest text-xs">
                      Grand Total Value
                    </td>
                    <td className="px-6 py-5 text-right">
                      <span className="text-xl font-black text-emerald-800 tracking-tighter">
                        ${calculateTotal().toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </span>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>

        {/* Right Section: Details & Remarks */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b bg-gray-50/30 flex items-center gap-2">
              <Info size={16} className="text-emerald-600" />
              <h3 className="font-black text-gray-800 tracking-tight text-sm uppercase">General Information</h3>
            </div>
            <div className="p-6 space-y-4">
              {[
                { icon: <User size={16} />, label: 'Received By', value: demand.createdBy },
                { icon: <MapPin size={16} />, label: 'Coming from', value: demand.serviceCenter },
                { icon: <Calendar size={16} />, label: 'Received Date', value: demand.createdAt }
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-lg bg-[#FFEDD5] flex items-center justify-center text-[#EA580B] shrink-0">
                    {item.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{item.label}</p>
                    <p className="text-sm font-bold text-gray-900 truncate">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col max-h-[700px]">
            <div className="px-6 py-4 border-b bg-gray-50/30 flex items-center gap-2">
              <MessageSquare size={16} className="text-emerald-600" />
              <h3 className="font-black text-gray-800 tracking-tight text-sm uppercase">Management Remarks</h3>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {demand.remarksHistory.map((remark, idx) => (
                <div key={idx} className={`p-3 rounded-xl border ${remark.author === 'Current Manager' ? 'bg-emerald-50/50 border-emerald-100 ml-4' : 'bg-gray-50 border-gray-200 mr-4'}`}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-black text-emerald-800 uppercase tracking-wider">{remark.author}</span>
                    <div className="flex items-center gap-1 text-[9px] text-gray-400 font-bold uppercase tracking-widest">
                      <Clock size={10} />
                      {remark.timestamp}
                    </div>
                  </div>
                  <p className="text-xs text-gray-700 leading-relaxed font-medium">
                    {remark.message}
                  </p>
                </div>
              ))}
              {demand.remarksHistory.length === 0 && (
                <div className="text-center py-8 text-gray-400 text-xs italic">No remarks found.</div>
              )}
            </div>

            <div className="p-6 border-t bg-gray-50/20">
              <form onSubmit={handleAddRemark} className="space-y-3">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Post Response</label>
                <textarea 
                  value={newRemark}
                  onChange={(e) => setNewRemark(e.target.value)}
                  placeholder="Enter response or internal notes..."
                  className="w-full p-3 text-xs border rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none resize-none h-24 font-medium"
                />
                <button 
                  type="submit"
                  disabled={!newRemark.trim()}
                  className="w-full py-3 bg-[#FFEDD5] text-[#EA580B] rounded-xl font-bold text-xs flex items-center justify-center gap-2 hover:bg-[#0a2c20] transition-all"
                >
                  <Send size={14} />
                  Submit Remark
                </button>
              </form>
            </div>
          </div>


        </div>
      </div>
    </div>
  );
};

export default BatchView;
