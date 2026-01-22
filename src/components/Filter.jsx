import React from 'react';

const Filter = ({
  dateFilter,
  setDateFilter,
  fromDate,
  setFromDate,
  toDate,
  setToDate,
  statusFilter,
  setStatusFilter,
}) => {
  const dateOptions = ['TODAY', 'THIS_WEEK', 'THIS_MONTH', 'CUSTOM'];
  const statusOptions = ['PENDING', 'DISPATCHED', 'RECEIVED'];

  return (
    <div className="bg-white border border-emerald-200 rounded-2xl p-6 shadow-sm min-h-[140px]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 h-full">
        
        {/* Date Filter */}
        <div className="rounded-lg flex flex-col justify-between">
          <div>
            <p className="text-xs font-black uppercase mb-2">Date</p>
            <div className="grid grid-cols-4 gap-1">
              {dateOptions.map(opt => (
                <button
                  key={opt}
                  onClick={() => setDateFilter(opt)}
                  className={`px-3 py-2 rounded-lg text-xs font-bold ${
                    dateFilter === opt ? 'bg-emerald-600 text-white' : 'bg-gray-100'
                  }`}
                >
                  {opt.replace('_', ' ')}
                </button>
              ))}
            </div>

            {dateFilter === 'CUSTOM' && (
              <div className="grid grid-cols-2 gap-2 mt-3">
                <input
                  type="date"
                  value={fromDate}
                  onChange={e => setFromDate(e.target.value)}
                  className="border rounded-lg px-2 py-1 text-xs"
                />
                <input
                  type="date"
                  value={toDate}
                  onChange={e => setToDate(e.target.value)}
                  className="border rounded-lg px-2 py-1 text-xs"
                />
              </div>
            )}
          </div>
        </div>

        {/* Status Filter */}
        <div className="p-4 rounded-lg flex flex-col justify-between">
          <p className="text-xs font-black uppercase mb-2">Status</p>
          <div className="flex gap-1">
            {statusOptions.map(st => (
              <label key={st} className="flex items-center gap-2 text-xs font-bold">
                <input
                  type="checkbox"
                  checked={statusFilter.includes(st)}
                  onChange={() =>
                    setStatusFilter(prev =>
                      prev.includes(st)
                        ? prev.filter(s => s !== st)
                        : [...prev, st]
                    )
                  }
                />
                {st}
              </label>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Filter;
