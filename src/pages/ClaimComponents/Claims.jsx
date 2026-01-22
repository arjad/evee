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
import {mockClaims} from '../../MockData';
import Heading from "../../components/TopHeading";

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
      <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg font-bold hover:bg-emerald-700 shadow-lg shadow-emerald-600/20 transition-all flex items-center gap-2 text-sm">
        Create claim
      </button>

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

      {/* Search */}
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

              {/* Common Reason (Description) */}
              <h3 className="text-sm font-bold text-gray-900 line-clamp-2 min-h-[2.5rem] group-hover:text-emerald-700 transition-colors leading-tight4">
                {claim.description}
              </h3>

                {/* Service Center - Prominently in place of details button */}
                <div className="flex items-centers">
                  <MapPin size={14} className="mt-1 text-emerald-600 mr-2 shrink-0" />
                  <span className="text-sm">{claim.serviceCenter}</span>
                </div>

            </div>
          </div>
        ))}
      </div>


      {/* Modal Backdrop */}
      {selectedClaim && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl animate-in fade-in zoom-in-95 duration-300 relative">
            
            {/* Modal Navigation & Controls */}
            <div className="flex items-center justify-between px-8 py-6 border-b border-slate-50 no-print">
              <div className="flex gap-4">
                <button
                  onClick={() => setActiveTab('details')}
                  className={`flex items-center gap-2 px-6 py-2 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${
                    activeTab === 'details' 
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30' 
                    : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                  }`}
                >
                  <FileText size={16} />
                  Details
                </button>
                <button
                  onClick={() => setActiveTab('invoice')}
                  className={`flex items-center gap-2 px-6 py-2 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${
                    activeTab === 'invoice' 
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30' 
                    : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                  }`}
                >
                  <Receipt size={16} />
                  Invoice
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  //  onClick={handlePrint}
                   className="h-10 w-10 flex items-center justify-center rounded-2xl bg-slate-100 text-slate-600 hover:bg-emerald-50 hover:text-emerald-600 transition-all shadow-sm"
                   title="Print Claim"
                >
                  <Printer size={18} />
                </button>
                <button
                  onClick={() => setSelectedClaim(null)}
                  className="h-10 w-10 flex items-center justify-center rounded-2xl bg-slate-900 text-white hover:bg-slate-800 transition-all shadow-lg"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Scrollable Content Container */}
            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
              
              {/* DETAILS TAB */}
              {activeTab === 'details' && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    
                    {/* Left Column: Image & Basic Info */}
                    <div className="lg:col-span-5 space-y-8">
                      <div className="group relative rounded-3xl overflow-hidden shadow-2xl shadow-slate-900/10">
                        <img
                          src={selectedClaim.productImage}
                          alt="Product"
                          className="w-full aspect-video object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className={`absolute top-4 right-4 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl ${getStatusBadge(selectedClaim.status)}`}>
                          {selectedClaim.status}
                        </div>
                      </div>

                      <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100">
                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                            <Box size={14} className="text-emerald-500" />
                            Claim Insight
                        </h4>
                        <div className="space-y-4">
                            <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Reference ID</p>
                                <p className="text-sm font-black text-emerald-700">{selectedClaim.id}</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Sale Identification</p>
                                <p className="text-sm font-bold text-slate-700">{selectedClaim.saleId}</p>
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Response Statement</p>
                                <p className="text-sm text-slate-600 italic leading-relaxed">"{selectedClaim.response}"</p>
                            </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Column: Detailed Forms */}
                    <div className="lg:col-span-7 space-y-10">
                      
                      <section>
                         <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight mb-6 flex items-center gap-3">
                            <span className="h-2 w-8 bg-emerald-500 rounded-full"></span>
                            Claimant Information
                         </h3>
                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            <div className="flex items-center gap-4">
                                <div className="h-10 w-10 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                                    <User size={18} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Full Name</p>
                                    <p className="text-sm font-bold text-slate-800">{selectedClaim.customerName}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="h-10 w-10 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                                    <CreditCard size={18} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Identity Number</p>
                                    <p className="text-sm font-bold text-slate-800">{selectedClaim.idCardNumber}</p>
                                </div>
                            </div>
                         </div>
                      </section>

                      <section>
                        <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight mb-6 flex items-center gap-3">
                            <span className="h-2 w-8 bg-emerald-500 rounded-full"></span>
                            Service Details
                        </h3>
                        <div className="bg-slate-900 rounded-[2rem] p-8 text-white relative overflow-hidden">
                           <div className="absolute top-0 right-0 p-8 opacity-10">
                              <MapPin size={100} />
                           </div>
                           <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-8">
                              <div>
                                <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-1">Assigned Center</p>
                                <p className="text-base font-bold">{selectedClaim.serviceCenter}</p>
                              </div>
                              <div>
                                <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-1">Purchase Cycle</p>
                                <p className="text-base font-bold">{selectedClaim.dateOfPurchase}</p>
                              </div>
                           </div>
                        </div>
                      </section>

                      <section>
                        <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight mb-4 flex items-center gap-3">
                            <span className="h-2 w-8 bg-emerald-500 rounded-full"></span>
                            Formal Description
                        </h3>
                        <p className="text-slate-600 leading-loose text-sm p-6 bg-slate-50 border border-slate-100 rounded-3xl">
                            {selectedClaim.description}
                        </p>
                      </section>

                    </div>
                  </div>
                </div>
              )}

              {/* INVOICE TAB (Paper Style) */}
              {activeTab === 'invoice' && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 flex justify-center pb-8">
                  <div className="w-full max-w-[800px] bg-white shadow-2xl border border-slate-100 rounded-lg p-10 relative">

            {/* Invoice Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-[#a3c639] rounded-full flex flex-col items-center justify-center text-white font-bold text-[10px] leading-tight">
                  <span className="mb-[-2px]">evee</span>
                  <span>evee</span>
                </div>
                <div>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight leading-none uppercase">EVEE Electric</h3>
                  <p className="text-lg font-bold text-[#446b30] mt-1">Service Center Invoice</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Branch Name</p>
                <p className="text-xl font-bold border-b-2 border-[#a3c639] pb-1 text-slate-800 inline-block min-w-[150px]">{selectedInvoice.branch}</p>
              </div>
            </div>
                        {/* Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 border border-gray-300 my-4">
              <div className="divide-y divide-gray-300 border-r border-gray-300">
                <div className="grid grid-cols-3">
                  <div className="bg-[#446b30] text-white text-[10px] font-bold p-2 uppercase flex items-center">Invoice No:</div>
                  <div className="col-span-2 p-2 font-bold text-green-700">{selectedInvoice.id}</div>
                </div>
                <div className="grid grid-cols-3">
                  <div className="bg-[#446b30] text-white text-[10px] font-bold p-2 uppercase flex items-center">Customer Name:</div>
                  <div className="col-span-2 p-2 font-semibold italic text-slate-700">{selectedInvoice.customerName}</div>
                </div>
                <div className="grid grid-cols-3">
                  <div className="bg-[#446b30] text-white text-[10px] font-bold p-2 uppercase flex items-center">Address:</div>
                  <div className="col-span-2 p-2 text-sm text-slate-600">{selectedInvoice.address}</div>
                </div>
                <div className="grid grid-cols-3">
                  <div className="bg-[#446b30] text-white text-[10px] font-bold p-2 uppercase flex items-center">Scooter Model:</div>
                  <div className="col-span-2 p-2 font-medium">{selectedInvoice.scooterModel}</div>
                </div>
              </div>
              <div className="divide-y divide-gray-300">
                <div className="grid grid-cols-3">
                  <div className="bg-[#446b30] text-white text-[10px] font-bold p-2 uppercase flex items-center">Date:</div>
                  <div className="col-span-2 p-2 font-medium italic">{selectedInvoice.date}</div>
                </div>
                <div className="grid grid-cols-3">
                  <div className="bg-[#446b30] text-white text-[10px] font-bold p-2 uppercase flex items-center">Phone:</div>
                  <div className="col-span-2 p-2 text-slate-600">03xx-xxxxxxx</div>
                </div>
                <div className="grid grid-cols-3">
                  <div className="bg-[#446b30] text-white text-[10px] font-bold p-2 uppercase flex items-center">Reg No:</div>
                  <div className="col-span-2 p-2 font-medium">{selectedInvoice.regNo}</div>
                </div>
                <div className="grid grid-cols-3">
                  <div className="bg-[#446b30] text-white text-[10px] font-bold p-2 uppercase flex items-center">Service Date:</div>
                  <div className="col-span-2 p-2 font-medium italic">{selectedInvoice.serviceDate}</div>
                </div>
              </div>
            </div>

{/* Product List */}
<div className="border border-gray-300 my-4">
  <div className="bg-[#446b30] text-white text-xs font-bold p-3 uppercase">
    Claimed Products
  </div>

  <div className="grid grid-cols-4 text-[11px] font-bold bg-gray-100 border-t border-gray-300">
    <div className="p-2 border-r">Product Name</div>
    <div className="p-2 border-r text-center">Qty</div>
    <div className="p-2 border-r text-right">Unit Price</div>
    <div className="p-2 text-right">Total</div>
  </div>

  {selectedClaim.products.map((product, idx) => (
    <div
      key={idx}
      className="grid grid-cols-4 text-[11px] border-t border-gray-300"
    >
      <div className="p-2 border-r italic">
        {product.name}
      </div>
      <div className="p-2 border-r text-center font-bold">
        {product.quantity}
      </div>
      <div className="p-2 border-r text-right">
        Rs. {product.price}
      </div>
      <div className="p-2 text-right font-semibold">
        Rs. {product.quantity * product.price}
      </div>
    </div>
  ))}
</div>
{/* Claim Approval Info */}
<div className="grid grid-cols-1 md:grid-cols-2 border border-gray-300">
  
  {/* LEFT */}
  <div className="divide-y divide-gray-300 border-r border-gray-300">
    <div className="grid grid-cols-3">
      <div className="bg-[#446b30] text-white text-[10px] font-bold p-2 uppercase">
        Claim Date
      </div>
      <div className="col-span-2 p-2 font-medium italic">
        {selectedClaim.claimDate}
      </div>
    </div>

    <div className="grid grid-cols-3">
      <div className="bg-[#446b30] text-white text-[10px] font-bold p-2 uppercase">
        Approved Status
      </div>
      <div className="col-span-2 p-2 font-bold text-slate-800">
        {selectedClaim.isApproved ? 'APPROVED' : 'NOT APPROVED'}
      </div>
    </div>
  </div>

  {/* RIGHT */}
  <div className="divide-y divide-gray-300">
    <div className="grid grid-cols-3">
      <div className="bg-[#446b30] text-white text-[10px] font-bold p-2 uppercase">
        Approved By
      </div>
      <div className="col-span-2 p-2 font-medium">
        {selectedClaim.approvedBy || '—'}
      </div>
    </div>

    <div className="grid grid-cols-3">
      <div className="bg-[#446b30] text-white text-[10px] font-bold p-2 uppercase">
        Service Center
      </div>
      <div className="col-span-2 p-2">
        {selectedClaim.serviceCenter}
      </div>
    </div>
  </div>
</div>





                  </div>
                </div>
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
