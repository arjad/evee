import React from 'react';
import { ArrowLeft, Edit3, Trash2, Package, Calendar, Tag, ShieldCheck, History } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const ProductView = () => {
  // Fake product data
  const product = {
    skuCode: 'LI-BC-001',
    itemName: 'Lithium-Ion Battery Cell',
    category: 'Batteries',
    description: 'High-performance lithium-ion battery suitable for all devices.',
    image: 'https://picsum.photos/40',
    unitPrice: 99.99,
    stockCount: 120,
    size: '10x5x2 cm',
    modal: 'Grade A',
    lastUpdated: '2026-01-22',
  };

  const handleBack = () => {
    alert('Back button clicked');
  };

  const handleEdit = () => {
    alert('Edit button clicked');
  };

  return (
    <div className="space-y-6">
    <div className="flex items-center justify-between">
          <h2 className="text-2xl font-black text-emerald-900 uppercase">
            Products Catalog / {product.itemName}
          </h2>
          
        <div className="flex gap-3">
        <button 
            onClick={handleBack}
            className="px-4 py-2 border rounded-lg font-bold text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm"
          >
            <ArrowLeft size={16} />
            Back
          </button>

          <button className="flex items-center px-4 py-2 border border-red-200 text-red-600 rounded-lg font-medium text-sm hover:bg-red-50 transition-colors">
            <Trash2 size={16} className="mr-2" />
            Delete
          </button>
          <Link to="/products/create">
            <button className="px-6 py-2.5 bg-emerald-600 text-white font-black text-[10px] uppercase rounded-xl">
              Edit
            </button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="grid md:grid-cols-2">
              <div className="aspect-square bg-gray-50 p-8 flex items-center justify-center border-r border-gray-100">
                <img 
                  src={product.image} 
                  alt={product.itemName} 
                  className="w-full h-full object-contain rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300" 
                />
              </div>
              <div className="p-8 space-y-6">
                <div>
                  <h3 className="text-xs font-bold text-emerald-800 uppercase tracking-widest mb-4">Product Description</h3>
                  <p className="text-gray-600 leading-relaxed text-sm">{product.description}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                  <div className="space-y-1">
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-tighter">Unit Price</p>
                    <p className="text-xl font-bold text-gray-900">${product.unitPrice}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-tighter">Current Stock</p>
                    <p className="text-xl font-bold text-emerald-600">{product.stockCount} units</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
            <h3 className="text-xs font-bold text-emerald-800 uppercase tracking-widest mb-6">Technical Specifications</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                  <Tag size={20} />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase">Category</p>
                  <p className="text-sm font-semibold text-gray-800">{product.category}</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                  <Package size={20} />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase">Size / Weight</p>
                  <p className="text-sm font-semibold text-gray-800">{product.size}</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-orange-50 text-orange-600 rounded-lg">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase">Modal / Grade</p>
                  <p className="text-sm font-semibold text-gray-800">{product.modal}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <h3 className="text-xs font-bold text-emerald-800 uppercase tracking-widest mb-6 flex items-center">
              <History size={16} className="mr-2" />
              Activity History
            </h3>
            <div className="space-y-6 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-100">
              <div className="relative pl-8">
                <div className="absolute left-0 top-1 w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center border-2 border-white">
                  <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                </div>
                <p className="text-sm font-semibold text-gray-800">Inventory updated</p>
                <p className="text-xs text-gray-400">{product.lastUpdated}</p>
              </div>
              <div className="relative pl-8">
                <div className="absolute left-0 top-1 w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center border-2 border-white">
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                </div>
                <p className="text-sm font-semibold text-gray-800">Product created</p>
                <p className="text-xs text-gray-400">2023-12-15</p>
              </div>
            </div>
            <button className="w-full mt-8 text-xs font-bold text-emerald-600 uppercase hover:text-emerald-700 transition-colors">
              View Full Audit Log
            </button>
          </div>

          <div className="bg-emerald-900 text-white rounded-2xl p-6 shadow-xl">
            <div className="flex items-center space-x-3 mb-4">
              <Calendar className="text-emerald-400" size={20} />
              <p className="text-sm font-bold opacity-80 uppercase tracking-wider">Restock Alert</p>
            </div>
            <p className="text-sm opacity-90 mb-6">
              Stock level is currently optimal. Next scheduled reorder in 14 days.
            </p>
            <button className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 rounded-lg text-sm font-bold transition-colors">
              Request Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductView;
