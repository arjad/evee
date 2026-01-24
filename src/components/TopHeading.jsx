import React, { useRef } from 'react';
import {
  ArrowLeft,
  Plus,
  Filter as FilterIcon,
  Upload,
  Download,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const TopHeading = ({ title, toggleFilters, newButtonLink, newButtonText, backBtn = true }) => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const handleBack = () => navigate(-1);
  const handleExport = () => {
    const data = [
      { Name: 'John Doe', Amount: 1200 },
      { Name: 'Jane Smith', Amount: 900 },
    ];
  
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Report');
  
    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });
  
    const blob = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
  
    saveAs(blob, 'report.xlsx');
  };
  const handleImportClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    console.log('Selected file:', file);
  };

  return (
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-black text-emerald-900 uppercase">{title}</h2>

      <div className="flex gap-3 items-center">
        {backBtn && (
          <button
            onClick={handleBack}
            className="px-4 py-2 rounded-lg font-bold text-gray-700 hover:bg-gray-50 flex items-center gap-2 text-sm"
          >
            <ArrowLeft size={16} />
            Back
          </button>
        )}



        {toggleFilters && (
          <>
            <input
              type="file"
              ref={fileInputRef}
              title='upload your excel file'
              onChange={handleFileChange}
              accept=".xlsx,.xls,.csv"
              className="hidden"
            />

            <button
              onClick={handleImportClick}
              className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-gray-700 font-bold text-[11px] uppercase rounded-xl hover:bg-gray-50 hover:border-emerald-500 hover:text-emerald-700 transition-all shadow-sm"
            >
              <Upload size={14} />
            </button>

            <button
              onClick={handleExport}
              title='download your excel file'
              className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-gray-700 font-bold text-[11px] uppercase rounded-xl hover:bg-gray-50 hover:border-emerald-500 hover:text-emerald-700 transition-all shadow-sm"
            >
              <Download size={14} />
            </button>
            <button
              onClick={toggleFilters}
              className="px-6 py-2.5 bg-white border border-emerald-600 text-emerald-700 font-black text-[10px] uppercase rounded-xl"
            >
              <FilterIcon className="inline mr-1" size={14} />
              Filters
            </button>
          </>
        )}

        {newButtonLink && newButtonText && (
          <Link to={newButtonLink}>
            <button className="px-6 py-2.5 bg-emerald-600 text-white font-black text-[10px] uppercase rounded-xl">
              <Plus className="inline mr-1" size={14} />
              {newButtonText}
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default TopHeading;