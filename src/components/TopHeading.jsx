import React from 'react';
import { ArrowLeft, Plus, Filter } from 'lucide-react'; // Added icons
import { Link, useNavigate } from 'react-router-dom';
const TopHeading = ({ title, toggleFilters, newButtonLink, newButtonText, backBtn = true }) => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1); // goes back to previous page
  };

  return (
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-black text-emerald-900 uppercase">
        {title}
      </h2>
      <div className="flex gap-3">
        {backBtn && (
          <button 
            onClick={handleBack}
            className="px-4 py-2 hover:text-black rounded-lg font-bold text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm"
          >
            <ArrowLeft size={16} />
            Back
          </button>
        )}

        {toggleFilters && (
          <button
            onClick={toggleFilters}
            className="px-6 py-2.5 bg-white border border-emerald-600 text-emerald-700 font-black text-[10px] uppercase rounded-xl"
          >
            <Filter className='inline mr-1' size={14} />
            Filters
          </button>
        )}
        {newButtonLink && newButtonText && (
          <Link to={newButtonLink}>
            <button className="px-6 py-2.5 bg-emerald-600 text-white font-black text-[10px] uppercase rounded-xl">
              <Plus className='inline mr-1' size={14}  />
              {newButtonText}
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default TopHeading;
