import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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

const AVAILABLE_PRODUCTS = [
  { name: 'Lithium-Ion Battery Cell', sku: 'LI-BC-2000', defaultPrice: 12.50, img: 'https://picsum.photos/40' },
  { name: 'Aluminium Frame Rail', sku: 'AL-FR-55', defaultPrice: 45.00, img: 'https://picsum.photos/40' },
  { name: 'Control Unit PCB', sku: 'CU-PCB-V2', defaultPrice: 85.00, img: 'https://picsum.photos/40' },
  { name: 'Motor Housing', sku: 'MH-X1', defaultPrice: 110.00, img: 'https://picsum.photos/40' },
  { name: 'Tire Set (14-inch)', sku: 'TR-14-SET', defaultPrice: 150.00, img: 'https://picsum.photos/40' },
  { name: 'Brake Pad Assembly', sku: 'BRK-PAD-01', defaultPrice: 35.00, img: 'https://picsum.photos/40' },
];

const DemandCreate = () => {
  const [products, setProducts] = useState([{ id: 'row-1', name: '', sku: '', quantity: 1, unitPrice: 0 }]);
  const [formInfo, setFormInfo] = useState({
    createdBy: 'Admin User',
    serviceCenter: 'Karachi Central Hub',
    manager: 'Sarah Johnson',
    date: new Date().toISOString().split('T')[0],
  });
  const [remarks, setRemarks] = useState('');
  const navigate = useNavigate();

  const addProductRow = () => {
    setProducts([...products, { id: `row-${Date.now()}`, name: '', sku: '', quantity: 1, unitPrice: 0 }]);
  };

  const removeProductRow = (id) => {
    if (products.length > 1) setProducts(products.filter(p => p.id !== id));
  };

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

  const calculateTotal = () => products.reduce((acc, p) => acc + p.quantity * p.unitPrice, 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ formInfo, products, remarks });
    alert('Demand Created!');
  };

  const handleBack = () => {
    navigate(-1);
  };

  // react-select options with images
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-black text-emerald-900 uppercase">
          Demand Records / Create 
        </h2>
        <div className="flex gap-3">
          <button 
            onClick={handleBack}
            className="px-4 py-2 border rounded-lg font-bold text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm"
          >
            <ArrowLeft size={16} />
            Back
          </button>
          <Link to="/demands/create">
            <button className="px-6 py-2.5 bg-emerald-600 text-white font-black text-[10px] uppercase rounded-xl">
              Create Demand
            </button>
          </Link>
        </div>
      </div>

      {/* Form Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
      <button type="button" onClick={addProductRow} className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-bold hover:bg-gray-100 transition">Add Product</button>

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
    </div>
  );
};

export default DemandCreate;
