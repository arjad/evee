import React, {useState, useMemo, useEffect} from 'react'

const Products = () => {
  // 1. Data and Column Definitions internalized
  const columns = [
    {key: 'sku', header: 'SKU Code', sortable: true},
    {key: 'item', header: 'Item Name', sortable: true},
    {key: 'category', header: 'Category', sortable: true},
    {key: 'manager', header: 'In Charge', sortable: true},
    {key: 'stockLevel', header: 'Units Left', sortable: true},
    {key: 'priority', header: 'Fulfillment', sortable: true},
    {key: 'lastUpdated', header: 'Last Sync', sortable: true},
  ]

  const initialData = [
    {
      id: 1,
      sku: 'INV-001',
      item: 'Ethernet Hub v4',
      category: 'Hardware',
      manager: 'Sarah Chen',
      stockLevel: 125,
      priority: 'Low',
      lastUpdated: '2h ago',
    },
    {
      id: 2,
      sku: 'INV-002',
      item: 'Fiber Patch Cable',
      category: 'Cabling',
      manager: 'Mark Wilson',
      stockLevel: 12,
      priority: 'High',
      lastUpdated: '10m ago',
    },
    {
      id: 3,
      sku: 'INV-003',
      item: 'Wireless Bridge',
      category: 'Networking',
      manager: 'Elena Rodriguez',
      stockLevel: 45,
      priority: 'Medium',
      lastUpdated: '1h ago',
    },
    {
      id: 4,
      sku: 'INV-004',
      item: 'Rack Mount Shelf',
      category: 'Hardware',
      manager: 'Sarah Chen',
      stockLevel: 89,
      priority: 'Low',
      lastUpdated: '5h ago',
    },
    {
      id: 5,
      sku: 'INV-005',
      item: 'Power Supply 750W',
      category: 'Electrical',
      manager: 'James Kim',
      stockLevel: 5,
      priority: 'High',
      lastUpdated: '45m ago',
    },
    {
      id: 6,
      sku: 'INV-006',
      item: 'NAS Storage 8TB',
      category: 'Storage',
      manager: 'Elena Rodriguez',
      stockLevel: 15,
      priority: 'Medium',
      lastUpdated: '3h ago',
    },
    {
      id: 7,
      sku: 'INV-007',
      item: 'SFP+ Transceiver',
      category: 'Networking',
      manager: 'Mark Wilson',
      stockLevel: 210,
      priority: 'Low',
      lastUpdated: '1d ago',
    },
    {
      id: 8,
      sku: 'INV-008',
      item: 'Wall Mount Rack',
      category: 'Hardware',
      manager: 'Sarah Chen',
      stockLevel: 22,
      priority: 'Medium',
      lastUpdated: '6h ago',
    },
    {
      id: 9,
      sku: 'INV-009',
      item: 'Cat6 Bulk Cable',
      category: 'Cabling',
      manager: 'James Kim',
      stockLevel: 3,
      priority: 'High',
      lastUpdated: '15m ago',
    },
    {
      id: 10,
      sku: 'INV-010',
      item: 'U-Bolt Connector',
      category: 'Fittings',
      manager: 'Mark Wilson',
      stockLevel: 500,
      priority: 'Low',
      lastUpdated: '2d ago',
    },
    {
      id: 11,
      sku: 'INV-011',
      item: 'Cooling Fan 120mm',
      category: 'Hardware',
      manager: 'Elena Rodriguez',
      stockLevel: 67,
      priority: 'Low',
      lastUpdated: '4h ago',
    },
    {
      id: 12,
      sku: 'INV-012',
      item: 'Surge Protector',
      category: 'Electrical',
      manager: 'James Kim',
      stockLevel: 31,
      priority: 'Medium',
      lastUpdated: '8h ago',
    },
  ]

  // 2. Component State
  const [data] = useState(initialData)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [sortState, setSortState] = useState({column: null, order: null})
  const [selectedIds, setSelectedIds] = useState(new Set())
  const [searchTerm, setSearchTerm] = useState('')

  // 3. Logic: Filtering
  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) return data
    const lowerSearch = searchTerm.toLowerCase()
    return data.filter((row) =>
      Object.values(row).some((val) =>
        String(val).toLowerCase().includes(lowerSearch),
      ),
    )
  }, [data, searchTerm])

  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm])

  // 4. Logic: Sorting
  const sortedData = useMemo(() => {
    if (!sortState.column || !sortState.order) return filteredData
    return [...filteredData].sort((a, b) => {
      const valA = a[sortState.column]
      const valB = b[sortState.column]
      if (valA < valB) return sortState.order === 'asc' ? -1 : 1
      if (valA > valB) return sortState.order === 'asc' ? 1 : -1
      return 0
    })
  }, [filteredData, sortState])

  // 5. Logic: Pagination
  const totalPages = Math.ceil(sortedData.length / pageSize)
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize
    return sortedData.slice(start, start + pageSize)
  }, [sortedData, currentPage, pageSize])

  // 6. Interaction Handlers
  const toggleSelectAll = () => {
    const currentIds = paginatedData.map((row) => row.id)
    const allOnPageSelected =
      currentIds.length > 0 && currentIds.every((id) => selectedIds.has(id))
    const next = new Set(selectedIds)
    if (allOnPageSelected) {
      currentIds.forEach((id) => next.delete(id))
    } else {
      currentIds.forEach((id) => next.add(id))
    }
    setSelectedIds(next)
  }

  const toggleSelectRow = (id) => {
    const next = new Set(selectedIds)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    setSelectedIds(next)
  }

  const handleSort = (key) => {
    setSortState((prev) => {
      if (prev.column === key) {
        if (prev.order === 'asc') return {column: key, order: 'desc'}
        if (prev.order === 'desc') return {column: null, order: null}
      }
      return {column: key, order: 'asc'}
    })
  }

  return (
    <div className="space-y-6">
      {/* Header UI */}
      <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-200">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
            </div>
            <h1 className="text-emerald-900 font-black text-2xl tracking-tight uppercase">
              Emerald Systems
            </h1>
          </div>
          <p className="text-slate-500 font-medium max-w-md">
            Internal Inventory Management Console
          </p>
        </div>
        <div className="flex gap-3">
          <button className="px-5 py-2.5 bg-white border border-emerald-100 text-emerald-700 font-bold text-xs uppercase rounded-xl hover:bg-emerald-50 transition-all shadow-sm flex items-center gap-2">
            Export CSV
          </button>
          <button className="px-5 py-2.5 bg-emerald-600 text-white font-bold text-xs uppercase rounded-xl hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200 flex items-center gap-2">
            + New Entry
          </button>
        </div>
      </header>

      {/* Main Table Container */}
      <div className="bg-white rounded-xl shadow-md border border-emerald-100 overflow-hidden">
        {/* Toolbar */}
        <div className="p-5 border-b border-emerald-50 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#f8fcf8]">
          <div className="relative flex-1 max-w-md">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-emerald-500">
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search SKU, item, manager..."
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
                setPageSize(Number(e.target.value))
                setCurrentPage(1)
              }}
            >
              {[5, 10, 25, 50].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Table Body */}
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
                        {col.key === 'priority' ? (
                          <span
                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border ${
                              row[col.key] === 'High'
                                ? 'bg-red-50 text-red-700 border-red-100'
                                : row[col.key] === 'Medium'
                                ? 'bg-amber-50 text-amber-700 border-amber-100'
                                : 'bg-emerald-50 text-emerald-700 border-emerald-100'
                            }`}
                          >
                            {row[col.key]}
                          </span>
                        ) : col.key === 'stockLevel' ? (
                          <div className="flex items-center gap-3">
                            <span
                              className={`w-8 font-semibold ${
                                row[col.key] < 50
                                  ? 'text-red-600'
                                  : 'text-slate-700'
                              }`}
                            >
                              {row[col.key]}
                            </span>
                            <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                              <div
                                className={`h-full ${
                                  row[col.key] < 50
                                    ? 'bg-red-500'
                                    : 'bg-emerald-500'
                                }`}
                                style={{
                                  width: `${Math.min(
                                    100,
                                    (row[col.key] / 150) * 100,
                                  )}%`,
                                }}
                              ></div>
                            </div>
                          </div>
                        ) : (
                          row[col.key]
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={columns.length + 1}
                    className="p-16 text-center text-slate-400"
                  >
                    No matching records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer / Pagination */}
        <div className="p-5 border-t border-emerald-100 bg-[#f8fcf8] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs font-bold text-emerald-700 uppercase tracking-widest">
            {sortedData.length > 0 ? (
              <>
                SHOWING {(currentPage - 1) * pageSize + 1} -{' '}
                {Math.min(currentPage * pageSize, sortedData.length)} OF{' '}
                {sortedData.length}
              </>
            ) : (
              '0 ITEMS'
            )}
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
              {Array.from({length: totalPages}, (_, i) => i + 1).map((page) => (
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

      <footer className="mt-8 text-center opacity-40">
        <p className="text-[10px] font-bold text-emerald-800 uppercase tracking-[0.2em]">
          Secure Logistics Terminal • Terminal ID: W-202
        </p>
      </footer>
    </div>
  )
}

export default Products

