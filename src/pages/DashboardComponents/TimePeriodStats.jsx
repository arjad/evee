import React, { useState, useMemo } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts'

const TimePeriodStats = ({ last_7_days, last_30_days }) => {
  const [activeTab, setActiveTab] = useState('7')

  const currentData = activeTab === '7' ? last_7_days : last_30_days

  // Example line chart data (replace with your real data)
  const barData = [
    { day: 'Mon', value: 12 },
    { day: 'Tue', value: 8 },
    { day: 'Wed', value: 15 },
    { day: 'Thu', value: 10 },
    { day: 'Fri', value: 18 },
    { day: 'Sat', value: 7 },
    { day: 'Sun', value: 14 },
  ]
  const pieData = [
    { name: 'Available', value: currentData?.available || 5, color: '#1E4DB7' },
    { name: 'Not Available', value: currentData?.not_available || 3, color: '#F59E0B' },
  ]

  const StatCard = ({ title, value, subtitle }) => {
    const isLoading = value === null || value === undefined
    return (
      <div className="flex flex-col p-4 min-h-[280px] rounded-xl bg-white shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider">{title}</h3>

        <div className="flex-grow flex items-center">
          {isLoading ? (
            <div className="h-10 w-24 bg-slate-100 animate-pulse rounded" />
          ) : (
            <span className="text-5xl font-extrabold text-slate-800">
              {value.toLocaleString()}
            </span>
          )}
        </div>

        <p className="text-xs text-slate-400 font-medium">{subtitle}</p>
      </div>
    )
  }


  const BarCard = ({ title, data, subtitle }) => {
    const isLoading = !data || data.length === 0
  
    return (
      <div className="flex flex-col p-4 min-h-[320px] rounded-xl bg-white shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">
          {title}
        </h3>
  
        <div className="flex-grow w-full h-[240px]">
          {isLoading ? (
            <div className="h-full w-full bg-slate-100 animate-pulse rounded" />
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#F59E0B" barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
  
        {subtitle && <p className="text-xs text-slate-400 mt-2">{subtitle}</p>}
      </div>
    )
  }
  
  const PieCard = ({ title, data, subtitle }) => {
    const isLoading = !Array.isArray(data) || data.length === 0
    return (
      <div className="flex flex-col p-4 min-h-[280px] rounded-xl bg-white shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">{title}</h3>
        <div className="flex-grow w-full min-h-[120px]">
          {isLoading ? (
            <div className="h-full w-full bg-slate-100 animate-pulse rounded" />
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={40}
                  outerRadius={55}
                  paddingAngle={4}
                >
                  {data.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" align="center" iconType="circle" wrapperStyle={{ paddingTop: 8 }} />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
        {subtitle && <p className="text-xs text-slate-400 mt-2">{subtitle}</p>}
      </div>
    )
  }

  return (
    <div className="w-full mt-4">
      {/* Tabs */}
      <div className="flex gap-6 items-center mb-6 border-b border-slate-200">
        <button
          onClick={() => setActiveTab('7')}
          className={`pb-2 text-lg font-semibold border-b-2 transition ${
            activeTab === '7'
              ? 'border-green-600 text-green-700'
              : 'border-transparent text-slate-400 hover:text-slate-600'
          }`}
        >
          Past 7 Days
        </button>

        <button
          onClick={() => setActiveTab('30')}
          className={`pb-2 text-lg font-semibold border-b-2 transition ${
            activeTab === '30'
              ? 'border-green-600 text-green-700'
              : 'border-transparent text-slate-400 hover:text-slate-600'
          }`}
        >
          Past 30 Days
        </button>
      </div>

      {/* Responsive Grid */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  
  {/* Chart takes 2 columns */}
  <div className="lg:col-span-2">
    <BarCard
      title="Products Trend"
      data={barData}
      subtitle="Products tracked over the week"
    />
  </div>

  {/* Pie chart stays single column */}
  <PieCard
    title="Stock Availability Status"
    data={pieData}
    subtitle="Overview of inventory health and supply levels."
  />

</div>

    </div>
  )
}

export default TimePeriodStats
