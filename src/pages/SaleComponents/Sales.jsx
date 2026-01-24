import React, { useState, useMemo } from 'react';
import DataTable from '../../components/DataTable';
import { Link } from 'react-router-dom';
import Filter from "../../components/Filter";
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { MOCK_SALES,DemandStats, Product_Data, Sale_months, SalesChart, SalesStats } from '../../MockData';
import Stats from '../../components/GeneralStats';
import Heading from '../../components/TopHeading.jsx';
import SaleViewModal from './SaleView.jsx';

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

/* ---------------- COMPONENT ---------------- */
const Sales = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [dateFilter, setDateFilter] = useState('THIS_MONTH');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [statusFilter, setStatusFilter] = useState([]);

  
  const productOptions = Product_Data.map(item => ({
    value: item.name,
    label: (
      <div className="flex items-center gap-2">
        <img src={item.picture} alt={item.item} className="w-6 h-6 object-cover rounded" />
        <span>{item.item}</span>
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
          const selected = Product_Data.find(item => item.name === value);
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
      <Heading
        title="Sales Records"
        toggleFilters={toggleFilters}
        newButtonLink="/"
        newButtonText="New Sale"
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

      <Stats stats={SalesStats} chartData={SalesChart} chartType="line" />

      <DataTable columns={columns} data={filteredSales} />

      <SaleViewModal
        isOpen={isViewOpen}
        onClose={() => setIsViewOpen(false)}
        selectedSale={selectedSale}
        formInfo={formInfo}
        setFormInfo={setFormInfo}
        products={products}
        productOptions={productOptions}
        updateProduct={updateProduct}
        addProductRow={addProductRow}
        removeProductRow={removeProductRow}
        calculateTotal={calculateTotal}
        remarks={remarks}
        setRemarks={setRemarks}
      />
    </div>
  );
};

export default Sales;
