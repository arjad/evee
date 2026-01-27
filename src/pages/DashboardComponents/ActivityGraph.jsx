import React, { useState, useEffect } from 'react'
import { Box, Typography, Divider, Button } from '@mui/material'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom',
      align: 'start',
      labels: {
        pointStyle: 'rect',
        boxWidth: 15,
        boxHeight: 5,
        padding: 20,
      },
    },
    title: {
      display: false,
    },
  },
}

const ActivityGraph = ({ monthlyData }) => {
  const [isAdmin, setIsAdmin] = useState(false)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const isAdminStr = localStorage.getItem('isAdmin')
    const isAdmin = isAdminStr ? JSON.parse(isAdminStr) : false
    setShowModal(isAdmin)
  }, [])

  const labels = monthlyData.months
  const datasets = []
  const colors = {
    found: 'green',
    removed: 'blue',
    inProgress: '#F59E0B',
  }

  Object.keys(monthlyData.products).forEach((product) => {
    const productData = monthlyData.products[product]
    datasets.push({
      label: `${product} - Found`,
      data: productData.found,
      borderColor: colors.found,
      backgroundColor: colors.found,
      tension: 0.2,
    })
    datasets.push({
      label: `${product} - Removed`,
      data: productData.removed,
      borderColor: colors.removed,
      backgroundColor: colors.removed,
      tension: 0.2,
    })
    datasets.push({
      label: `${product} - In Progress`,
      data: productData.inProgress,
      borderColor: colors.inProgress,
      backgroundColor: colors.inProgress,
      tension: 0.2,
    })
  })

  const chartData = {
    labels,
    datasets,
  }

  return (
    <Box sx={{ width: '100%', my: 3 }}>
      <Typography component="h2" sx={{ fontWeight: 600, fontSize: '20px', mb: 2 }}>
        Privacy Activity Per Product Per Month
      </Typography>

      <Box sx={{ width: '100%', maxWidth: '1065px', minWidth: '300px' }}>
        <Box sx={{ minHeight: '40px', display: 'flex', flexDirection: 'row', gap: 2 }}>
          <Typography sx={{ fontWeight: 600, color: '#555' }}>
            Track records per product monthly
          </Typography>
        </Box>

        <Divider sx={{ mt: 3, mb: 3, borderColor: '#ECECEC', borderWidth: '0 0 2px 0' }} />

        {/* Chart container */}
        <Box sx={{ position: 'relative', width: '100%', minHeight: 300 }}>
          <Line data={chartData} options={{ ...options, maintainAspectRatio: false }} />

          {/* Show modal and blur only if NOT admin */}
          {!showModal && (
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

          )}
        </Box>
      </Box>
    </Box>
  )
}

export default ActivityGraph