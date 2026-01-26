import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Filter from "../../components/Filter";
import { 
  Search, 
  ShieldCheck, 
  Clock, 
  AlertTriangle, 
  MapPin,
  Calendar,
  X,
  FileText,
  Receipt,
  Printer,
  Download,
  ArrowLeft,
  Box,
  User,
  CreditCard,
} from 'lucide-react'
import {mockClaims, selectedInvoice2} from '../../MockData';
import Heading from "../../components/TopHeading";
import InvoicePreview from '../../components/Invoice';


const Claims = () => {
  const [search, setSearch] = useState("");
  const [selectedClaim, setSelectedClaim] = useState(null);
  const [activeTab, setActiveTab] = useState("details");
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
  const selectedInvoice = selectedClaim
  ? {
      id: selectedClaim.id,
      branch: selectedClaim.serviceCenter,
      customerName: "Ahmed Raza",
      address: "House 21, Block B, Gulshan-e-Iqbal, Karachi",
      scooterModel: "EVEE C1 Air",
      date: selectedClaim.claimDate,
      regNo: "ABC-1234",
      serviceDate: selectedClaim.date,
    }
  : null;

  const clearFilters = () => {
    setDateFilter('THIS_MONTH');
    setFromDate('');
    setToDate('');
    setStatusFilter([]);
  };
  const getStatusBadge = (status) => {
    switch (status) {
      case 'OPEN': return 'bg-orange-500 text-white shadow-orange-500/20';
      case 'IN_REVIEW': return 'bg-blue-500 text-white shadow-blue-500/20';
      case 'RESOLVED': return 'bg-emerald-500 text-white shadow-emerald-500/20';
      default: return 'bg-gray-500 text-white shadow-gray-500/20';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'OPEN': return <AlertTriangle size={12} />;
      case 'IN_REVIEW': return <Clock size={12} />;
      case 'RESOLVED': return <ShieldCheck size={12} />;
      default: return null;
    }
  };

  const filteredClaims = mockClaims.filter(
    (c) =>
      c.id.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase()) ||
      c.serviceCenter.toLowerCase().includes(search.toLowerCase())
  );
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1); // goes back to previous page
    // OR navigate('/demands') if you want to go to a specific route
  };

  return (
    <div className="space-y-6">
      <Heading
        title="Claims"
        toggleFilters={toggleFilters}
        newButtonLink="/"
        newButtonText="New Claim"
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

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Search claims..."
          className="w-full border rounded-lg py-2 pl-10 pr-4 text-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
        {filteredClaims.map((claim) => (
          <div 
            key={claim.id} 
            onClick={() => { setSelectedClaim(claim); setActiveTab('details'); }}
            className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-emerald-900/5 transition-all duration-300 overflow-hidden flex flex-col cursor-pointer transform hover:-translate-y-1"
          >
            {/* Small Pic Container */}
            <div className="h-28 relative overflow-hidden bg-gray-100">
              <img 
                src={claim.productImage} 
                alt={claim.description}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute top-2 left-2">
                <span className={`flex items-center space-x-1 px-2 py-0.5 rounded-full text-[8px] font-bold shadow-lg uppercase tracking-widest ${getStatusBadge(claim.status)}`}>
                  {getStatusIcon(claim.status)}
                  <span>{claim.status.replace('_', ' ')}</span>
                </span>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-4 flex-1 flex flex-col">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded uppercase tracking-wider">
                  {claim.id}
                </span>
                <div className="flex items-center text-[10px] font-medium text-gray-400">
                  <Calendar size={12} className="mr-1" />
                  {claim.date}
                </div>
              </div>

              <h3 className="text-sm font-bold text-gray-900 line-clamp-2 min-h-[2.5rem] group-hover:text-emerald-700 transition-colors leading-tight4">
                {claim.description}
              </h3>
              <div className="flex items-centers">
                <MapPin size={14} className="mt-1 text-emerald-600 mr-2 shrink-0" />
                <span className="text-sm">{claim.serviceCenter}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedClaim && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl animate-in fade-in zoom-in-95 duration-300 relative">
            <div className="flex items-center justify-between px-8 py-6 border-b border-slate-50 no-print">
              <Heading
                title="Claims / claim 1"
                backBtn={false}
              />

              <div className="flex items-center gap-2">
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
                <button
                  onClick={() => setSelectedClaim(null)}
                  className="h-10 w-10 flex items-center justify-center rounded-2xl bg-slate-100 hover:bg-emerald-50"
                >
                  <X size={15} />
                </button>
              </div>
            </div>

            <div className="flex gap-6 items-center mb-6 border-b border-slate-200 px-8">
              <button
                onClick={() => setActiveTab('details')}
                className={`pb-2 text-lg font-semibold border-b-2 transition ${
                  activeTab === 'details'
                    ? 'border-green-600 text-green-700'
                    : 'border-transparent text-slate-400 hover:text-slate-600'
                }`}
              >
                Details
              </button>

              <button
                onClick={() => setActiveTab('invoice')}
                className={`pb-2 text-lg font-semibold border-b-2 transition ${
                  activeTab === 'invoice'
                    ? 'border-green-600 text-green-700'
                    : 'border-transparent text-slate-400 hover:text-slate-600'
                }`}
              >
                Invoice
              </button>
            </div>
            {/* Scrollable Content Container */}
            <div className="flex-1 overflow-y-auto p-8 pt-0 custom-scrollbar">
              
              {/* DETAILS TAB */}
              {activeTab === 'details' && (
                <div className="flex justify-center pb-5">
                  <div className="w-full max-w-[800px] border-slate-100 rounded-lg relative">
                    <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-6">

                      {/* Product Image */}
                      <div className="rounded-2xl overflow-hidden shadow-lg">
                        <img 
                          src={selectedClaim.productImage} 
                          alt={selectedClaim.description} 
                          className="w-full h-60 object-cover"
                        />
                      </div>

                      {/* Approved By / Service Center */}
                      <div className="grid grid-cols-1 gap-4">
                        <div className="bg-white border-left-gray-300 border-left p-4">
                          <div className="grid grid-cols-3 gap-2">
                            <div className="text-[10px] font-bold p-2 uppercase flex items-center">Approved By</div>
                            <div className="col-span-2 p-2">
                              <input
                                type="text"
                                value={selectedClaim.approvedBy || ''}
                                onChange={(e) => setSelectedClaim({...selectedClaim, approvedBy: e.target.value})}
                                className="w-full p-1 border rounded"
                              />
                            </div>
                            <div className="text-[10px] font-bold p-2 uppercase flex items-center">Service Center</div>
                            <div className="col-span-2 p-2">
                              <input
                                type="text"
                                value={selectedClaim.serviceCenter || ''}
                                onChange={(e) => setSelectedClaim({...selectedClaim, serviceCenter: e.target.value})}
                                className="w-full p-1 border rounded"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Info Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 border border-gray-300 mb-5">
                      <div className="divide-y divide-gray-300 border-r border-gray-300">
                        {[
                          { label: "Claim ID", key: "id", readOnly: true },
                          { label: "Customer Name", key: "customerName" },
                          { label: "Address", key: "address" },
                          { label: "Claim Date", key: "claimDate" }
                        ].map((item, idx) => (
                          <div key={idx} className="grid grid-cols-3">
                            <div className="text-[10px] font-bold p-2 uppercase flex items-center">{item.label}:</div>
                            <div className="col-span-2 p-2">
                              <input
                                type="text"
                                value={selectedClaim[item.key] || ''}
                                readOnly={item.readOnly}
                                onChange={(e) => setSelectedClaim({...selectedClaim, [item.key]: e.target.value})}
                                className={`w-full p-1 border rounded ${item.readOnly ? 'bg-gray-100' : ''}`}
                              />
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="divide-y divide-gray-300">
                        {[
                          { label: "Sale ID", key: "saleId" },
                          { label: "Scooter Model", key: "scooterModel" },
                          { label: "Service Date", key: "serviceDate" },
                          { label: "Approval Status", key: "isApproved", type: "checkbox" }
                        ].map((item, idx) => (
                          <div key={idx} className="grid grid-cols-3 items-center">
                            <div className="text-[10px] font-bold p-2 uppercase flex items-center">{item.label}:</div>
                            <div className="col-span-2 p-2">
                              {item.type === 'checkbox' ? (
                                <input
                                  type="checkbox"
                                  checked={selectedClaim[item.key]}
                                  onChange={(e) => setSelectedClaim({...selectedClaim, [item.key]: e.target.checked})}
                                />
                              ) : (
                                <input
                                  type="text"
                                  value={selectedClaim[item.key] || ''}
                                  onChange={(e) => setSelectedClaim({...selectedClaim, [item.key]: e.target.value})}
                                  className="w-full p-1 border rounded"
                                />
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Claimed Products */}
                    <div className="border border-gray-300 mb-4">
                      <div className="text-xs font-bold p-3 uppercase">
                        Claimed Products
                      </div>
                      <div className="grid grid-cols-4 text-[11px] font-bold bg-gray-100 border-t border-gray-300">
                        <div className="p-2 border-r">Product Name</div>
                        <div className="p-2 border-r text-center">Qty</div>
                        <div className="p-2 border-r text-right">Unit Price</div>
                        <div className="p-2 text-right">Total</div>
                      </div>
                      {selectedClaim.products.map((product, idx) => (
                        <div key={idx} className="grid grid-cols-4 text-[11px] border-t border-gray-300">
                          <div className="p-2 border-r italic">
                            <input
                              type="text"
                              value={product.name}
                              onChange={(e) => {
                                const products = [...selectedClaim.products];
                                products[idx].name = e.target.value;
                                setSelectedClaim({...selectedClaim, products});
                              }}
                              className="w-full p-1 border rounded italic"
                            />
                          </div>
                          <div className="p-2 border-r text-center">
                            <input
                              type="number"
                              value={product.quantity}
                              onChange={(e) => {
                                const products = [...selectedClaim.products];
                                products[idx].quantity = parseInt(e.target.value) || 0;
                                setSelectedClaim({...selectedClaim, products});
                              }}
                              className="w-full p-1 border rounded text-center font-bold"
                            />
                          </div>
                          <div className="p-2 border-r text-right">
                            <input
                              type="number"
                              value={product.price}
                              onChange={(e) => {
                                const products = [...selectedClaim.products];
                                products[idx].price = parseFloat(e.target.value) || 0;
                                setSelectedClaim({...selectedClaim, products});
                              }}
                              className="w-full p-1 border rounded text-right"
                            />
                          </div>
                          <div className="p-2 text-right font-semibold">
                            Rs. {product.quantity * product.price}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="border border-gray-300 my-4">
                      <div className="text-xs font-bold p-3 uppercase">
                        Remarks
                      </div>
                      <textarea
                        placeholder="Add a remark..."
                        rows="3"
                        className="w-full p-2 border rounded resize-none outline-none border-none"
                      />

                    </div>
                    <button className="px-6 py-2.5 float-right bg-emerald-600 text-white font-black text-[10px] uppercase rounded-xl">
                      Save
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'invoice' && (
                <InvoicePreview
                  type="CLAIM"
                  invoice={selectedInvoice2}
                  claim={selectedClaim}
                />
              )}
            </div>
          </div>
        </div>
      )}


      {filteredClaims.length === 0 && (
        <p className="text-sm text-gray-500 text-center">No claims found</p>
      )}
    </div>
  );
};

export default Claims;
