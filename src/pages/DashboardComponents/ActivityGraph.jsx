import React from 'react'
import { Box, Typography, Divider } from '@mui/material'
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

      <Box
        sx={{
          width: '100%',
          maxWidth: '1065px',
          minWidth: '300px',
        }}
      >
        <Box sx={{ minHeight: '40px', display: 'flex', flexDirection: 'row', gap: 2 }}>
          <Typography sx={{ fontWeight: 600, color: '#555' }}>
            Track records per product monthly
          </Typography>
        </Box>

        <Divider sx={{ mt: 3, mb: 3, borderColor: '#ECECEC', borderWidth: '0 0 2px 0' }} />

        <Box sx={{ width: '100%', minHeight: 300 }}>
          <Line data={chartData} options={{ ...options, maintainAspectRatio: false }} />
        </Box>
      </Box>
    </Box>
  )
}

export default ActivityGraph
