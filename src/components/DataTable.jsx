// components/DataTable.jsx
import React, { useMemo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const DataTable = ({
  columns,
  data,
  pageSizeOptions = [5, 10, 25, 50],
  defaultPageSize = 10,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(defaultPageSize);
  const [sortState, setSortState] = useState({ column: null, order: null });
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [searchTerm, setSearchTerm] = useState('');

  // Filtering
  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) return data;
    const lowerSearch = searchTerm.toLowerCase();
    return data.filter((row) =>
      Object.values(row).some((val) =>
        String(val).toLowerCase().includes(lowerSearch)
      )
    );
  }, [data, searchTerm]);

  useEffect(() => setCurrentPage(1), [searchTerm]);

  // Sorting
  const sortedData = useMemo(() => {
    if (!sortState.column || !sortState.order) return filteredData;
    return [...filteredData].sort((a, b) => {
      const valA = a[sortState.column];
      const valB = b[sortState.column];
      if (valA < valB) return sortState.order === 'asc' ? -1 : 1;
      if (valA > valB) return sortState.order === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortState]);

  // Pagination
  const totalPages = Math.ceil(sortedData.length / pageSize);
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, currentPage, pageSize]);

  // Selection Handlers
  const toggleSelectAll = () => {
    const currentIds = paginatedData.map((row) => row.id);
    const allOnPageSelected =
      currentIds.length > 0 && currentIds.every((id) => selectedIds.has(id));
    const next = new Set(selectedIds);
    if (allOnPageSelected) currentIds.forEach((id) => next.delete(id));
    else currentIds.forEach((id) => next.add(id));
    setSelectedIds(next);
  };

  const toggleSelectRow = (id) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  const handleSort = (key) => {
    setSortState((prev) => {
      if (prev.column === key) {
        if (prev.order === 'asc') return { column: key, order: 'desc' };
        if (prev.order === 'desc') return { column: null, order: null };
      }
      return { column: key, order: 'asc' };
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-emerald-100 overflow-hidden">
      {/* Toolbar */}
      <div className="p-5 border-b border-emerald-50 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#f8fcf8]">
        <div className="relative flex-1 max-w-md">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-emerald-500">
            🔍
          </span>
          <input
            type="text"
            placeholder="Search..."
            className="block w-full pl-10 pr-3 py-2.5 border border-emerald-200 rounded-lg bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-4">
          <label className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
            Rows:
          </label>
          <select
            className="bg-white border border-emerald-200 text-slate-700 text-sm rounded-lg px-3 py-2 cursor-pointer focus:ring-emerald-500"
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setCurrentPage(1);
            }}
          >
            {pageSizeOptions.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="bg-emerald-50 border-b border-emerald-100">
              <th className="p-4 w-14 text-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-emerald-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                  checked={
                    paginatedData.length > 0 &&
                    paginatedData.every((row) => selectedIds.has(row.id))
                  }
                  onChange={toggleSelectAll}
                />
              </th>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`p-4 font-bold text-emerald-800 text-xs uppercase tracking-widest ${
                    col.sortable
                      ? 'cursor-pointer hover:bg-emerald-100 transition-colors'
                      : ''
                  }`}
                  onClick={() => col.sortable && handleSort(col.key)}
                >
                  <div className="flex items-center gap-2">
                    {col.header}
                    {col.sortable && (
                      <span
                        className={`text-[10px] ${
                          sortState.column === col.key
                            ? 'text-emerald-600'
                            : 'opacity-30'
                        }`}
                      >
                        {sortState.column === col.key
                          ? sortState.order === 'asc'
                            ? '▲'
                            : '▼'
                          : '⇅'}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-emerald-50">
            {paginatedData.length > 0 ? (
              paginatedData.map((row) => (
                <tr
                  key={row.id}
                  className={`hover:bg-emerald-50/40 transition-all ${
                    selectedIds.has(row.id) ? 'bg-emerald-50/60' : ''
                  }`}
                >
                  <td className="p-4 text-center">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-emerald-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                      checked={selectedIds.has(row.id)}
                      onChange={() => toggleSelectRow(row.id)}
                    />
                  </td>
                  {columns.map((col) => (
  <td
    key={`${row.id}-${col.key}`}
    className="p-4 text-sm text-slate-700 font-medium"
  >
    {col.key === 'item' ? (
      <Link
        to={`/products/view`}
        className="text-emerald-700 font-bold hover:underline"
      >
        {row[col.key]}
      </Link>
    ) : col.key === 'picture' ? (
      <img
        src={row[col.key]}
        alt={row.item || 'image'}
        className="w-10 h-10 object-cover rounded-md cursor-pointer"
        onClick={() => window.location.href = `/products/view`} // optional if you want picture clickable
      />
    ) : col.render ? (
      col.render(row[col.key], row)
    ) : (
      row[col.key]
    )}
  </td>
))}




                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length + 1} className="p-16 text-center text-slate-400">
                  No matching records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="p-5 border-t border-emerald-100 bg-[#f8fcf8] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-xs font-bold text-emerald-700 uppercase tracking-widest">
          {sortedData.length > 0
            ? `SHOWING ${(currentPage - 1) * pageSize + 1} - ${Math.min(
                currentPage * pageSize,
                sortedData.length
              )} OF ${sortedData.length}`
            : '0 ITEMS'}
        </div>
        <div className="flex items-center gap-2 bg-white border border-emerald-200 rounded-xl p-1 shadow-sm">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="p-2 text-emerald-700 hover:bg-emerald-50 disabled:opacity-20 transition-all"
          >
            ←
          </button>
          <div className="flex gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 text-[11px] font-black rounded-lg transition-all ${
                  currentPage === page
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-emerald-700 hover:bg-emerald-50'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
          <button
            disabled={currentPage === totalPages || totalPages === 0}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            className="p-2 text-emerald-700 hover:bg-emerald-50 disabled:opacity-20 transition-all"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
