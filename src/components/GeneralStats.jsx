// Stats.jsx
import React from 'react';
import { 
  BarChart, Bar, LineChart, Line,
  ResponsiveContainer, XAxis, YAxis,
  Tooltip, Cell, CartesianGrid
} from 'recharts';

// Function to get color based on status
const getStatusColor = (status) => {
  switch (status) {
    case 'PENDING':
      return '#f59e0b';
    case 'IN_TRANSIT':
      return '#3b82f6';
    case 'RECEIVED':
      return '#10b981';
    case 'REJECTED':
      return '#f43f5e';
    default:
      return '#94a3b8';
  }
};

// Custom tooltip for charts
const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload || !payload.length) return null;

  return (
    <div className="bg-white border border-slate-200 rounded-lg px-3 py-2 shadow-sm">
      <p className="text-xs font-bold uppercase text-slate-600">
        {payload[0].payload.name.replace('_', ' ')}
      </p>
      <p className="text-sm font-black text-slate-900">
        {payload[0].value}
      </p>
    </div>
  );
};

// Main Stats component
const Stats = ({ stats = [], chartData = [], chartType = 'bar' }) => {
  const renderChart = () => {
    if (!chartData.length) return <p className="text-xs text-slate-400">No chart data</p>;
  
    if (chartType === 'bar') {
      return (
        <BarChart
          data={chartData}
          margin={{ top: 0, right: 10, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
          <XAxis 
            dataKey="name" 
            tick={{ fontSize: 10 }}
            hide 
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 10 }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="value" radius={[6, 6, 0, 0]} barSize={24}>
            {chartData.map((item, index) => (
              <Cell key={index} fill={getStatusColor(item.name)} />
            ))}
          </Bar>
        </BarChart>
      );
    } else if (chartType === 'line') {
      return (
        <LineChart
          data={chartData}
          margin={{ top: 0, right: 10, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis 
            tick={{ fontSize: 10 }}
            dataKey="name" 
          />
          <YAxis 
            tick={{ fontSize: 10 }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#EA580B"
            strokeWidth={2}
            dot={{ r: 4 }}
          />
        </LineChart>
      );
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, i) => (
        <div
          key={i}
          className="bg-white p-6 rounded-2xl border border-emerald-100 shadow-sm flex flex-col justify-between h-full"
        >
          {/* Top content */}
          <div>
            <p
              className={`text-[10px] font-black uppercase tracking-widest opacity-60 mb-1 ${
                stat.color === 'emerald'
                  ? 'text-emerald-800'
                  : stat.color === 'amber'
                  ? 'text-amber-800'
                  : stat.color === 'blue'
                  ? 'text-blue-800'
                  : 'text-rose-800'
              }`}
            >
              {stat.label}
            </p>
            <p className="text-3xl font-black text-slate-900">
              {stat.val}
            </p>
          </div>

          <div>
            <hr className="mt-3" />
            <p className="text-[11px] text-slate-400 pt-2">
              Total {stat.label} we currently have
            </p>
          </div>
        </div>
      ))}


        {/* Chart Card */}
        <div className="bg-white p-4 rounded-2xl border border-emerald-100 shadow-sm md:col-span-2">
          <div className="flex h-full gap-6">
            {/* Chart */}
            <div className="flex-1 flex flex-col">
              <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-3 text-slate-800">
                Status Distribution
              </p>

              <div className="flex-1 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  {renderChart()}
                </ResponsiveContainer>
              </div>
            </div>

            {/* Legend */}
            <div className="w-40 flex-shrink-0 flex flex-col justify-center gap-3 border-l border-slate-100 pl-4">
              <p className="text-[9px] font-black uppercase text-slate-400 mb-1">
                Quick View
              </p>

              {chartData.length ? (
                chartData.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: '#EA580B' }}
                      />
                      <span className="text-[10px] font-bold uppercase text-[#EA580B]">
                        {item.name.replace('_', ' ')}
                      </span>
                    </div>
                    <span className="text-[10px] font-black text-slate-900">
                      {item.value}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-[10px] italic text-slate-300">No data</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
