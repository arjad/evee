import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft,
} from 'lucide-react'
const TopHeading = ({ title, toggleFilters, newButtonLink, newButtonText }) => {
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
        <button 
          onClick={handleBack}
          className="px-4 py-2 hover:text-black rounded-lg font-bold text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm"
        >
          <ArrowLeft size={16} />
          Back
        </button>

        {toggleFilters && (
          <button
            onClick={toggleFilters}
            className="px-6 py-2.5 bg-white border border-emerald-600 text-emerald-700 font-black text-[10px] uppercase rounded-xl"
          >
            Filters
          </button>
        )}
        {newButtonLink && newButtonText && (
          <Link to={newButtonLink}>
            <button className="px-6 py-2.5 bg-emerald-600 text-white font-black text-[10px] uppercase rounded-xl">
              {newButtonText}
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default TopHeading;
