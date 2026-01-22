
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Filter from "../../components/Filter";
import Heading from '../../components/TopHeading';
import { 
  ArrowLeft,
} from 'lucide-react';
import {INITIAL_INVOICES} from '../../MockData';


const Invoices = () => {
  const [invoices, setInvoices] = useState(INITIAL_INVOICES);
  const [selectedId, setSelectedId] = useState(null);

  const selectedInvoice = invoices.find(inv => inv.id === selectedId);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-PK', { style: 'currency', currency: 'PKR', maximumFractionDigits: 0 }).format(amount);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // To ensure the saved file has a relevant name when using "Save as PDF"
    const originalTitle = document.title;
    document.title = `Invoice_${selectedInvoice.id}_${selectedInvoice.customerName.replace(/\s+/g, '_')}`;
    window.print();
    // Revert title after printing starts (dialog is usually blocking or near-instant)
    setTimeout(() => {
      document.title = originalTitle;
    }, 100);
  };

  const handleApprove = () => {
    setInvoices(prev => prev.map(inv => 
      inv.id === selectedId 
        ? { ...inv, approvedBy: 'John Doe', status: 'Paid' } 
        : inv
    ));
  };
    const navigate = useNavigate();
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
  const handleBack = () => {
    navigate(-1);
  };
  if (selectedInvoice) {
    return (
      <div className="space-y-6 animate-in fade-in duration-300">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 no-print">
      <div className="flex items-center justify-between">
          <h2 className="text-2xl font-black text-emerald-900 uppercase">
            Invoices
          </h2>

      </div>

          <div className="flex items-center gap-2">
          <button 
            onClick={handleBack}
            className="px-4 py-2 border rounded-lg font-bold text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm"
          >
            <ArrowLeft size={16} />
            Back
          </button>
            <button 
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold text-slate-700 hover:bg-gray-50 transition-colors shadow-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
              Print
            </button>
            <button 
              onClick={handleDownload}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold text-slate-700 hover:bg-gray-50 transition-colors shadow-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
              Download PDF
            </button>
            {!selectedInvoice.approvedBy && (
              <button 
                onClick={handleApprove}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-semibold hover:bg-green-700 transition-colors shadow-md shadow-green-100"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Approve Invoice
              </button>
            )}
            {selectedInvoice.approvedBy && (
              <div className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 border border-green-200 rounded-lg text-sm font-bold">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                Verified Approved
              </div>
            )}
          </div>
        </div>

        {/* Digital Recreation of the Paper Invoice */}
        <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-sm border border-gray-200 overflow-hidden text-slate-800 invoice-container">
          <div className="p-8 md:p-12 space-y-8">
            
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
            <div className="grid grid-cols-1 md:grid-cols-2 border border-gray-300">
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

            {/* Items Table */}
            <div className="border border-gray-300">
              <div className="grid grid-cols-12 bg-[#446b30] text-white text-[10px] font-bold uppercase tracking-wider">
                <div className="col-span-1 p-2 border-r border-white/20 text-center">S.No</div>
                <div className="col-span-6 p-2 border-r border-white/20">Service / Item Description</div>
                <div className="col-span-1 p-2 border-r border-white/20 text-center">Qty</div>
                <div className="col-span-2 p-2 border-r border-white/20 text-right">Unit Price</div>
                <div className="col-span-2 p-2 text-right">Total</div>
              </div>
              <div className="divide-y divide-gray-100 min-h-[250px] relative">
                {selectedInvoice.items.map((item, idx) => (
                  <div key={item.id} className="grid grid-cols-12 text-sm font-medium">
                    <div className="col-span-1 p-3 border-r border-gray-100 text-center">{idx + 1}</div>
                    <div className="col-span-6 p-3 border-r border-gray-100 italic text-slate-700">{item.desc}</div>
                    <div className="col-span-1 p-3 border-r border-gray-100 text-center">{item.qty}</div>
                    <div className="col-span-2 p-3 border-r border-gray-100 text-right">{item.price.toLocaleString()}</div>
                    <div className="col-span-2 p-3 text-right font-bold">{item.total.toLocaleString()}/-</div>
                  </div>
                ))}
                {/* Visual placeholders for empty rows */}
                {[...Array(5)].map((_, i) => (
                  <div key={`empty-${i}`} className="grid grid-cols-12 h-10">
                    <div className="col-span-1 border-r border-gray-100"></div>
                    <div className="col-span-6 border-r border-gray-100"></div>
                    <div className="col-span-1 border-r border-gray-100"></div>
                    <div className="col-span-2 border-r border-gray-100"></div>
                    <div className="col-span-2"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Totals Section */}
            <div className="flex justify-end">
              <div className="w-full md:w-1/2 border border-gray-300 divide-y divide-gray-300">
                <div className="grid grid-cols-2">
                  <div className="bg-[#a3c639]/10 text-[10px] font-bold p-2 uppercase text-[#446b30] flex items-center">Subtotal</div>
                  <div className="p-2 text-right font-medium">{selectedInvoice.total.toLocaleString()}/-</div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="bg-[#a3c639]/10 text-[10px] font-bold p-2 uppercase text-[#446b30] flex items-center">Discount</div>
                  <div className="p-2 text-right font-medium">0/-</div>
                </div>
                <div className="grid grid-cols-2 bg-gray-50">
                  <div className="bg-[#446b30] text-white text-xs font-bold p-2 uppercase flex items-center">Grand Total</div>
                  <div className="p-2 text-right text-xl font-black text-slate-900">{selectedInvoice.total.toLocaleString()}/-</div>
                </div>
              </div>
            </div>

            {/* Footer Notes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 text-[11px] text-slate-600 leading-tight">
              <div>
                <p className="font-bold mb-1">Note: Warranty claims will only be entertained with original invoice.</p>
                <p className="italic text-green-700 font-semibold">Thank you for visiting EVEE Service Center.</p>
                <div className="flex gap-4 mt-2 font-bold text-green-700">
                  <span>Go Green</span>
                  <span>Ride Electric</span>
                  <span>Save Future</span>
                </div>
                <div className="mt-4 space-y-1">
                  <p className="font-bold text-slate-800 underline">Terms & Conditions:</p>
                  <p>1. Goods once sold are not returnable.</p>
                  <p>2. Warranty claims must be supported with this bill.</p>
                  <p>3. Company is not responsible for improper installation of mishandling.</p>
                </div>
              </div>
              <div className="flex flex-col items-end justify-end space-y-4">
                <div className="text-right">
                  <p className="font-bold text-slate-800 uppercase tracking-widest text-[10px] mb-8">Prepared By:</p>
                  <div className="w-48 border-b-2 border-gray-400 pb-2 relative">
                    <span className={`absolute -top-10 right-4 font-handwriting transform -rotate-6 text-3xl whitespace-nowrap ${selectedInvoice.approvedBy ? 'text-blue-700 font-bold opacity-100' : 'text-slate-400 opacity-30 italic'}`}>
                      {selectedInvoice.approvedBy || "Amanat"}
                    </span>
                    <p className="text-[10px] font-bold text-slate-500 uppercase">Authorised Signature & Stamp</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Heading
        title="Invoice"
        toggleFilters={toggleFilters}
        newButtonLink="/"
        newButtonText="New Invoice"
      />

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 no-print">
        {invoices.map((inv) => (
          <div 
            key={inv.id} 
            className="group flex flex-col p-6 rounded-2xl bg-white shadow-sm border border-slate-200 hover:shadow-xl hover:border-green-300 transition-all cursor-pointer relative overflow-hidden"
            onClick={() => setSelectedId(inv.id)}
          >
            {/* Status Badge */}
            <div className={`absolute top-0 right-0 px-3 py-1 rounded-bl-xl text-[10px] font-bold uppercase tracking-wider ${inv.status === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
              {inv.status}
            </div>

            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center text-green-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Invoice #{inv.id}</h3>
                <p className="text-lg font-bold text-slate-800 truncate">{inv.customerName}</p>
              </div>
            </div>

            <div className="space-y-3 flex-grow">
               <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500">Date</span>
                  <span className="text-slate-700 font-semibold">{inv.date}</span>
               </div>
               <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500">Branch</span>
                  <span className="text-slate-700 font-semibold">{inv.branch}</span>
               </div>
               {inv.approvedBy && (
                 <div className="flex justify-between items-center text-xs text-green-600 font-bold italic">
                   <span className="flex items-center">
                     <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                     Approved
                   </span>
                   <span>{inv.approvedBy}</span>
                 </div>
               )}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-50 flex items-center justify-between">
              <div>
                 <p className="text-xs font-bold text-slate-400 uppercase mb-1">Total Amount</p>
                 <p className="text-xl font-black text-green-700">{formatCurrency(inv.total)}</p>
              </div>
              <button className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all shadow-lg">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Invoices;
