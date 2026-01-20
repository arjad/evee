
import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell
} from 'recharts';

const MOVEMENT_DATA = [
  { name: 'Mon', inbound: 400, outbound: 240 },
  { name: 'Tue', inbound: 300, outbound: 139 },
  { name: 'Wed', inbound: 200, outbound: 980 },
  { name: 'Thu', inbound: 278, outbound: 390 },
  { name: 'Fri', inbound: 189, outbound: 480 },
  { name: 'Sat', inbound: 239, outbound: 380 },
  { name: 'Sun', inbound: 349, outbound: 430 },
];

const CATEGORY_DATA = [
  { name: 'Electronics', value: 45000, color: '#16a34a' },
  { name: 'Furniture', value: 32000, color: '#22c55e' },
  { name: 'Apparel', value: 28000, color: '#4ade80' },
  { name: 'Groceries', value: 15000, color: '#86efac' },
  { name: 'Others', value: 10000, color: '#bbf7d0' },
];

const RECENT_REPORTS = [
  { id: 1, name: 'Monthly Inventory Audit - May', date: 'June 01, 2024', size: '2.4 MB', type: 'PDF' },
  { id: 2, name: 'Stock Discrepancy Report', date: 'May 28, 2024', size: '1.1 MB', type: 'CSV' },
  { id: 3, name: 'Vendor Performance Summary', date: 'May 25, 2024', size: '4.8 MB', type: 'XLSX' },
];

const Reports = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Advanced Reports</h2>
        <div className="flex items-center gap-4 text-sm font-medium text-green-600">
          <button className="hover:underline">View All Reports</button>
          <span className="text-gray-300">|</span>
          <button className="hover:underline">Schedule Automated Report</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Card 1: Stock Movement Trend */}
        <div className="lg:col-span-2 flex flex-col p-6 rounded-2xl bg-white shadow-sm border border-slate-200">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-lg font-bold text-slate-800">Stock Movement Trend</h3>
              <p className="text-sm text-slate-500">Daily inbound vs outbound volume</p>
            </div>
            <select className="bg-gray-50 border border-gray-200 text-slate-600 text-xs font-semibold rounded-lg p-1.5 outline-none focus:ring-2 focus:ring-green-500">
              <option>This Week</option>
              <option>Last Week</option>
              <option>Custom Range</option>
            </select>
          </div>
          
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MOVEMENT_DATA}>
                <defs>
                  <linearGradient id="colorInbound" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#16a34a" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#16a34a" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorOutbound" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#facc15" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#facc15" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="inbound" stroke="#16a34a" strokeWidth={3} fillOpacity={1} fill="url(#colorInbound)" />
                <Area type="monotone" dataKey="outbound" stroke="#facc15" strokeWidth={3} fillOpacity={1} fill="url(#colorOutbound)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          
          <div className="flex gap-6 mt-4 pt-4 border-t border-slate-50">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-600"></div>
              <span className="text-xs font-bold text-slate-600">Inbound (Total: 2,255)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <span className="text-xs font-bold text-slate-600">Outbound (Total: 3,049)</span>
            </div>
          </div>
        </div>

        {/* Card 2: Category Breakdown */}
        <div className="flex flex-col p-6 rounded-2xl bg-white shadow-sm border border-slate-200">
          <h3 className="text-lg font-bold text-slate-800 mb-1">Value by Category</h3>
          <p className="text-sm text-slate-500 mb-6">Total inventory value: $130,000</p>
          
          <div className="flex-grow h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={CATEGORY_DATA} margin={{ left: -20 }}>
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 11, fontWeight: 600}} width={80} />
                <Tooltip 
                   cursor={{fill: 'transparent'}}
                   contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={24}>
                  {CATEGORY_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 space-y-3">
             <div className="p-3 bg-green-50 rounded-xl border border-green-100">
                <p className="text-xs font-bold text-green-800">Insight</p>
                <p className="text-xs text-green-700 mt-1 leading-relaxed">
                  Electronics accounts for 35% of total value. Consider optimizing turnover for this segment.
                </p>
             </div>
          </div>
        </div>

        {/* Card 3: Recent Reports List */}
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-white shadow-sm border border-slate-200">
            <h3 className="text-lg font-bold text-slate-800 mb-4">Export Recent Activity</h3>
            <div className="space-y-4">
              {RECENT_REPORTS.map(report => (
                <div key={report.id} className="flex items-center justify-between p-3 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors group">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 rounded-lg text-green-600">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800">{report.name}</p>
                      <p className="text-xs text-slate-400">{report.date} • {report.size}</p>
                    </div>
                  </div>
                  <button className="p-2 text-slate-400 hover:text-green-600 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-br from-green-600 to-green-700 shadow-lg shadow-green-200 text-white relative overflow-hidden">
             <div className="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold mb-2">Inventory Health Summary</h3>
                  <p className="text-green-50 text-sm opacity-90 leading-relaxed">
                    Based on current trends, your stock turnover has improved by <span className="font-bold underline">12.4%</span> this month.
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mt-6">
                   <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20">
                      <p className="text-xs text-green-100 font-medium">Accuracy</p>
                      <p className="text-xl font-bold">98.2%</p>
                   </div>
                   <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20">
                      <p className="text-xs text-green-100 font-medium">Fill Rate</p>
                      <p className="text-xl font-bold">94.5%</p>
                   </div>
                </div>

                <button className="mt-6 w-full py-3 bg-white text-green-700 font-bold rounded-xl hover:bg-green-50 transition-colors">
                   Generate Custom Analysis
                </button>
             </div>
             {/* Decorative Circles */}
             <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full"></div>
             <div className="absolute top-10 -right-5 w-20 h-20 bg-white/5 rounded-full"></div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Reports;
