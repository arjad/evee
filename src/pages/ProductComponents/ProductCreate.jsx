import React, { useState } from 'react';
import { ArrowLeft, Save, Upload, Sparkles, X, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const ProductCreate = ({ initialData, onSave, onCancel }) => {
  const [formData, setFormData] = useState(initialData || {
    itemName: '',
    skuCode: '',
    category: 'Hardware',
    size: '',
    modal: 'Low',
    unitPrice: 0,
    description: '',
    stockCount: 0,
    image: 'https://picsum.photos/seed/new/400/400'
  });

  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateDescription = async () => {
    if (!formData.itemName) {
      alert("Please enter an item name first.");
      return;
    }
    setIsGenerating(true);
    const desc = "ss"
    setFormData(prev => ({ ...prev, description: desc }));
    setIsGenerating(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleBack = () => {
    alert('Back button clicked');
  };

  return (
    <div className="space-y-6">
          <div className="flex items-center justify-between">
          <h2 className="text-2xl font-black text-emerald-900 uppercase">
            Products Catalog / Create
          </h2>
          
        <div className="flex gap-3">
        <button 
            onClick={handleBack}
            className="px-4 py-2 border rounded-lg font-bold text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm"
          >
            <ArrowLeft size={16} />
            Back
          </button>

          <Link to="/products/create">
            <button className="px-6 py-2.5 bg-emerald-600 text-white font-black text-[10px] uppercase rounded-xl">
              Save
            </button>
          </Link>
        </div>
      </div>

      <form id="product-form" onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Basic Info & Media */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 space-y-6">
            <h3 className="text-xs font-bold text-emerald-800 uppercase tracking-widest mb-2">General Information</h3>
            
            <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-tight mb-2">Item Name</label>
                <input 
                  type="text"
                  required
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all text-sm"
                  placeholder="e.g. Ethernet Hub v4"
                  value={formData.itemName}
                  onChange={(e) => setFormData({...formData, itemName: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-tight mb-2">Category</label>
                <input 
                  type="text"
                  required
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all text-sm"
                  placeholder="e.g. Ethernet Hub v4"
                  value={formData.itemName}
                  onChange={(e) => setFormData({...formData, itemName: e.target.value})}
                />
              </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-tight mb-2">SKU Code</label>
                  <input 
                    type="text"
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all text-sm"
                    placeholder="INV-000"
                    value={formData.skuCode}
                    onChange={(e) => setFormData({...formData, skuCode: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-tight mb-2">Category</label>
                  <select 
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all text-sm appearance-none"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                  >
                    <option value="Hardware">Hardware</option>
                    <option value="Software">Software</option>
                    <option value="Accessories">Accessories</option>
                  </select>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-tight">Description</label>
                  <button 
                    type="button"
                    onClick={handleGenerateDescription}
                    disabled={isGenerating}
                    className="flex items-center text-[10px] font-bold text-emerald-600 hover:text-emerald-700 uppercase tracking-widest disabled:opacity-50"
                  >
                    {isGenerating ? <Loader2 size={12} className="mr-1 animate-spin" /> : <Sparkles size={12} className="mr-1" />}
                    AI Generate
                  </button>
                </div>
                <textarea 
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all text-sm resize-none"
                  placeholder="Describe the product features and usage..."
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
            <h3 className="text-xs font-bold text-emerald-800 uppercase tracking-widest mb-6">Product Specifications</h3>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-tight mb-2">Size / Variant</label>
                <input 
                  type="text"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all text-sm"
                  placeholder="e.g. Small, 2m, 65W"
                  value={formData.size}
                  onChange={(e) => setFormData({...formData, size: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-tight mb-2">Modal / Priority</label>
                <select 
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all text-sm appearance-none"
                  value={formData.modal}
                  onChange={(e) => setFormData({...formData, modal: e.target.value})}
                >
                  <option value="Low">Low Priority</option>
                  <option value="Medium">Medium Priority</option>
                  <option value="High">High Priority</option>
                  <option value="Critical">Critical</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing & Stock */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 space-y-6">
            <h3 className="text-xs font-bold text-emerald-800 uppercase tracking-widest mb-2">Pricing & Stock</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-tight mb-2">Unit Price ($)</label>
                <input 
                  type="number"
                  required
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all text-sm font-bold"
                  value={formData.unitPrice}
                  onChange={(e) => setFormData({...formData, unitPrice: Number(e.target.value)})}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-tight mb-2">Initial Stock</label>
                <input 
                  type="number"
                  required
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all text-sm"
                  value={formData.stockCount}
                  onChange={(e) => setFormData({...formData, stockCount: Number(e.target.value)})}
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 space-y-6">
            <h3 className="text-xs font-bold text-emerald-800 uppercase tracking-widest mb-2">Product Image</h3>
            <div className="aspect-square w-full rounded-2xl bg-gray-50 border-2 border-dashed border-gray-200 flex flex-col items-center justify-center p-4 relative group cursor-pointer hover:border-emerald-400 transition-colors">
              {formData.image ? (
                <img src={formData.image} className="w-full h-full object-contain rounded-lg" alt="Preview" />
              ) : (
                <>
                  <Upload className="text-gray-300 mb-2" size={32} />
                  <p className="text-[10px] font-bold text-gray-400 uppercase">Upload Media</p>
                </>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProductCreate;
