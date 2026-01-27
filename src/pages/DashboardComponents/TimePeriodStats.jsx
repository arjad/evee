import React, { useState, useEffect } from 'react'
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
  const [showModal, setShowModal] = useState(false)
  const currentData = activeTab === '7' ? last_7_days : last_30_days
  useEffect(() => {
    const isAdminStr = localStorage.getItem('isAdmin')
    const isAdmin = isAdminStr ? JSON.parse(isAdminStr) : false
    setShowModal(isAdmin)
  }, [])

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

  const BarCard = ({ title, data, subtitle }) => {
    const isLoading = !data || data.length === 0
  
    return (
      <div className="flex flex-col p-4 min-h-[320px] rounded-xl bg-white shadow-sm border border-slate-200 hover:shadow-md transition-shadow relative">
        {!showModal &&  
          <div className="absolute inset-0 z-10 flex items-center justify-center p-6 text-center animate-in fade-in duration-500">
            {/* The background blur is handled by the parent container's conditional class, 
                but we can add a subtle dark overlay here */}
            <div className="absolute inset-0 bg-white/10 backdrop-blur-md rounded-xl"></div>
            
            <div className="relative z-20 bg-white shadow-xl border border-slate-200 p-6 rounded-2xl max-w-xs transform transition-transform hover:scale-105">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h4 className="text-lg font-bold text-slate-900 mb-1">Access Restricted</h4>
              <p className="text-sm text-slate-500 mb-4">
                Detailed inventory breakdown is only available for administrators.
              </p>
              <button 
                disabled
                className="w-full py-2 px-4 bg-slate-100 text-slate-400 text-xs font-bold uppercase tracking-widest rounded-lg cursor-not-allowed"
              >
                Contact Supervisor
              </button>
            </div>
          </div>
        }

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
    return (
      <div className="flex flex-col p-4 min-h-[280px] rounded-xl bg-white shadow-sm border border-slate-200 hover:shadow-md transition-shadow relative">
        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">{title}</h3>
  
        <div className="w-full h-[240px]">
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
              <Legend
                verticalAlign="bottom"
                align="center"
                iconType="circle"
                wrapperStyle={{ paddingTop: 8 }}
              />
            </PieChart>
          </ResponsiveContainer>
          {!showModal && (
            <div className="absolute inset-0 z-10 flex items-center justify-center p-6 text-center">
              <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-xl"></div>
              <div className="relative z-20 bg-white shadow-xl border border-slate-200 p-6 rounded-2xl max-w-xs transform transition-transform hover:scale-105">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-1">Access Restricted</h4>
                <p className="text-sm text-slate-500 mb-4">
                  Detailed inventory breakdown is only available for administrators.
                </p>
                <button 
                  disabled
                  className="w-full py-2 px-4 bg-slate-100 text-slate-400 text-xs font-bold uppercase tracking-widest rounded-lg cursor-not-allowed"
                >
                  Contact Supervisor
                </button>
              </div>
            </div>
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
