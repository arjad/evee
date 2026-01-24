import Select from 'react-select';
import React, { useState } from 'react';
import InvoicePreview from '../../components/Invoice.jsx';

import Heading from '../../components/TopHeading.jsx';
import { 
  X,
  Printer,
} from 'lucide-react'
import { INITIAL_INVOICES, selectedClaim, selectedInvoice2} from '../../MockData.jsx';


const SaleView = ({
  isOpen,
  onClose,
  selectedSale,
  formInfo,
  setFormInfo,
  products,
  productOptions,
  updateProduct,
  addProductRow,
  removeProductRow,
  calculateTotal,
  remarks,
  setRemarks,
}) => {
  const [activeTab, setActiveTab] = useState("details");
  const selectedInvoice = INITIAL_INVOICES[0]
  const [selectedId, setSelectedId] = useState(null);
  
  const handleDownload = () => {
    const originalTitle = document.title;
    document.title = `Invoice_${selectedInvoice.id}_${selectedInvoice.customerName.replace(/\s+/g, '_')}`;
    window.print();
    setTimeout(() => (document.title = originalTitle), 100);
  };
  if (!isOpen || !selectedSale) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={() => setSelectedId(null)} 
      >
      <div
        className="bg-white rounded-3xl w-[95%] max-w-6xl max-h-[90vh] overflow-y-auto p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-slate-50 no-print">
          <Heading
            title="Sales / sale 1"
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
              onClick={onClose} // <-- call the prop to close
              className="h-10 w-10 flex items-center justify-center rounded-2xl bg-slate-100 hover:bg-emerald-50"
            >
              <X size={15} />
            </button>

          </div>
        </div>

        <div className="flex gap-6 items-center mb-6 border-b border-slate-200 mt-5">
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
        {activeTab === 'details' && (
          <div>
            <div className="grid grid-cols-1 py-4 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Requested By', field: 'createdBy' },
                { label: 'Service Center', field: 'serviceCenter' },
                { label: 'Manager', field: 'manager' },
                { label: 'Date', field: 'date', type: 'date' },
              ].map((info, i) => (
                <div key={i} className="flex flex-col">
                  <label className="text-xs font-black uppercase text-gray-400">
                    {info.label}
                  </label>
                  <input
                    type={info.type || 'text'}
                    value={formInfo[info.field]}
                    onChange={(e) =>
                      setFormInfo({ ...formInfo, [info.field]: e.target.value })
                    }
                    className="mt-1 p-2 border rounded-lg text-sm"
                  />
                </div>
              ))}
            </div>

            <table className="w-full text-left">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-xs font-black">Product</th>
                  <th className="px-6 py-3 text-xs font-black">SKU</th>
                  <th className="px-6 py-3 text-xs font-black">Qty</th>
                  <th className="px-6 py-3 text-xs font-black">Price</th>
                  <th className="px-6 py-3 text-xs font-black">Amount</th>
                  <th className="px-6 py-3 text-xs font-black">Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id}>
                    <td className="px-6 py-3">
                      <Select
                        options={productOptions}
                        value={productOptions.find(opt => opt.value === p.name)}
                        onChange={(s) => updateProduct(p.id, 'name', s.value)}
                      />
                    </td>
                    <td className="px-6 py-3">{p.sku}</td>
                    <td className="px-6 py-3">
                      <input
                        type="number"
                        value={p.quantity}
                        className='border'
                        onChange={(e) =>
                          updateProduct(p.id, 'quantity', +e.target.value)
                        }
                      />
                    </td>
                    <td className="px-6 py-3">
                      <input
                        type="number"
                        value={p.unitPrice}
                        className='border'
                        onChange={(e) =>
                          updateProduct(p.id, 'unitPrice', +e.target.value)
                        }
                      />
                    </td>
                    <td className="px-6 py-3 font-bold">
                      ${(p.quantity * p.unitPrice).toFixed(2)}
                    </td>
                    <td className="px-6 py-3">
                      <button
                        onClick={() => removeProductRow(p.id)}
                        className="text-red-600 text-xs font-bold"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="text-right font-bold mt-4">
              Total: ${calculateTotal().toFixed(2)}
            </div>

            <button
              onClick={addProductRow}
              className="mt-4 px-4 py-2 border rounded-lg"
            >
              Add Product
            </button>

            <textarea
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              className="w-full mt-4 p-3 border rounded-xl"
              rows={3}
            />

            <button className="mt-4 px-4 py-2 border rounded-lg">
              SAVE
            </button>
          </div>
        )}
        {activeTab === 'invoice' && (
        <InvoicePreview
          type="SALE"
          invoice={selectedInvoice2}
          claim={selectedClaim}
        />
      )}
      </div>

      
    </div>
  );
};

export default SaleView;
