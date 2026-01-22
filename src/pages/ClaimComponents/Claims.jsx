import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Filter from "../../components/Filter";

import { 
    Search, 
    Info, 
    ShieldCheck, 
    Clock, 
    AlertTriangle, 
    MoreVertical, 
    MapPin,
    Calendar,
    X,
    FileText,
    Receipt,
    CheckCircle2
  } from 'lucide-react';
  import { 
    ArrowLeft,
  } from 'lucide-react';
const mockClaims = [
  {
    id: "CLM-1001",
    description: "Faulty Battery Connector",
    status: "IN_REVIEW",
    date: "2026-01-21",
    serviceCenter: "Karachi Central",
    productImage: "https://picsum.photos/400/300?1",
  },
  {
    id: "CLM-1002",
    description: "Cancelled order due to delay",
    status: "OPEN",
    date: "2026-01-20",
    serviceCenter: "Lahore East",
    productImage: "https://picsum.photos/400/300?2",
  },
  {
    id: "CLM-1003",
    description: "Transit damage reported",
    status: "RESOLVED",
    date: "2026-01-19",
    serviceCenter: "Karachi West",
    productImage: "https://picsum.photos/400/300?3",
  },
];

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
      {/* Header */}
      <div className="flex items-center justify-between">


          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-black text-emerald-900 uppercase">
                Claims
            </h2>
          </div>
        
        <div className="flex items-center gap-3">
        <button 
            onClick={handleBack}
            className="px-4 py-2 border rounded-lg font-bold text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm"
          >
            <ArrowLeft size={16} />
            Back
          </button>
          <button
            onClick={toggleFilters}
            className="px-6 py-2.5 bg-white border border-emerald-600 text-emerald-700 font-black text-[10px] uppercase rounded-xl"
          >
            Filters
          </button>
          <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg font-bold hover:bg-emerald-700 shadow-lg shadow-emerald-600/20 transition-all flex items-center gap-2 text-sm">
            Create claim
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
              <h3 className="text-sm font-bold text-gray-900 line-clamp-2 min-h-[2.5rem] group-hover:text-emerald-700 transition-colors leading-tight mb-4">
                {claim.description}
              </h3>

              <div className="space-y-3 mt-auto">
                {/* Service Center - Prominently in place of details button */}
                <div className="flex items-center text-xs text-emerald-800 bg-emerald-50/50 p-2.5 rounded-lg border border-emerald-100 group-hover:bg-emerald-100 transition-colors">
                  <MapPin size={14} className="text-emerald-600 mr-2 shrink-0" />
                  <div className="flex flex-col">
                    <span className="text-[9px] uppercase font-bold text-emerald-600/60 leading-none mb-1">Service Center</span>
                    <span className="font-bold truncate">{claim.serviceCenter}</span>
                  </div>
                </div>

              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedClaim && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 relative">
            <button
              onClick={() => setSelectedClaim(null)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700"
            >
              <X size={18} />
            </button>

            <img
              src={selectedClaim.productImage}
              alt=""
              className="h-48 w-full object-cover rounded-lg mb-4"
            />

            <h3 className="text-lg font-bold mb-1">{selectedClaim.id}</h3>
            <p className="text-sm mb-2">{selectedClaim.description}</p>

            <div className="text-sm text-gray-600 space-y-1">
              <p><b>Status:</b> {selectedClaim.status}</p>
              <p><b>Date:</b> {selectedClaim.date}</p>
              <p><b>Service Center:</b> {selectedClaim.serviceCenter}</p>
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
