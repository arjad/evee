import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Filter from "../../components/Filter";
import Heading from '../../components/TopHeading';
import InvoicePreview from '../../components/Invoice';
import { INITIAL_INVOICES, selectedClaim, selectedInvoice2} from '../../MockData';
import { 
  X,
  Printer,
} from 'lucide-react'

const Invoices = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("details");
  const [selectedClaims, setSelectedClaim] = useState(null);
  const [invoices, setInvoices] = useState(INITIAL_INVOICES);
  const [selectedId, setSelectedId] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [dateFilter, setDateFilter] = useState('THIS_MONTH');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [statusFilter, setStatusFilter] = useState([]);
  const selectedInvoice = invoices.find(inv => inv.id === selectedId);

  const formatCurrency = (amount) =>
    new Intl.NumberFormat('en-PK', {
      style: 'currency',
      currency: 'PKR',
      maximumFractionDigits: 0
    }).format(amount);

  const toggleFilters = () => {
    setIsFilterOpen(prev => {
      if (prev) clearFilters();
      return !prev;
    });
  };

  const clearFilters = () => {
    setDateFilter('THIS_MONTH');
    setFromDate('');
    setToDate('');
    setStatusFilter([]);
  };

  const handlePrint = () => window.print();

  const handleDownload = () => {
    const originalTitle = document.title;
    document.title = `Invoice_${selectedInvoice.id}_${selectedInvoice.customerName.replace(/\s+/g, '_')}`;
    window.print();
    setTimeout(() => (document.title = originalTitle), 100);
  };

  const handleApprove = () => {
    setInvoices(prev =>
      prev.map(inv =>
        inv.id === selectedId
          ? { ...inv, approvedBy: 'John Doe', status: 'Paid' }
          : inv
      )
    );
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <Heading
        title="Invoice"
        toggleFilters={toggleFilters}
        newButtonLink="/"
        newButtonText="New Invoice"
      />

      {/* Filters */}
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

      {/* Invoice Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 no-print">
        {invoices.map((inv) => (
          <div 
            key={inv.id} 
            className="group flex flex-col p-6 rounded-2xl bg-white shadow-sm border border-slate-200 hover:shadow-xl hover:border-green-300 transition-all cursor-pointer relative overflow-hidden"
            onClick={() => setSelectedId(inv.id)}
          >
            <div className={`absolute top-0 right-0 px-3 py-1 rounded-bl-xl text-xs font-bold
              ${inv.status === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}
            >
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
      {/* ================= MODAL ================= */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl animate-in fade-in zoom-in-95 duration-300 relative">
            <div className="flex items-center justify-between px-8 py-6 border-b border-slate-50 no-print">
              <Heading
                title="Invoices / invoice 1"
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
                  onClick={handleDownload}
                  className="h-10 w-10 flex items-center justify-center rounded-2xl bg-slate-100 text-slate-600 hover:bg-emerald-50 hover:text-emerald-600 transition-all shadow-sm"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                </button>
                <button
                  onClick={() => setSelectedId(null)}
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
    
    </div>
  );
};

export default Invoices;
