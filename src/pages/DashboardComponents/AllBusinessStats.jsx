import React from 'react'
import { Container, Box, Typography, Skeleton } from '@mui/material'

const AllBusinessStats = ({
  found,
  removed,
  optOutSubmitted,
  loading = false,
}) => {
  const renderStat = (label, value, description, background) => (
    <Box
      sx={{
        width: { xs: '100%', sm: '100%', md: '397px', lg: '372px' },
        minHeight: '178px',
        borderRadius: '6.84px',
        p: '28.33px 21.5px',
        display: 'flex',
        flexDirection: 'column',
        gap: '29.31px',
        background,
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '4.89px' }}>
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: '16px',
            textTransform: 'uppercase',
            color: '#fff',
          }}
        >
          {label}
        </Typography>

        {loading ? (
          <Skeleton
            variant="text"
            width={120}
            height={40}
            sx={{ bgcolor: 'rgba(255,255,255,0.3)', borderRadius: '4px' }}
          />
        ) : (
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: '32px',
              textTransform: 'uppercase',
              color: '#fff',
            }}
          >
            {(value || 0).toLocaleString()}
          </Typography>
        )}
      </Box>

      <Typography sx={{ fontSize: '14px', color: '#fff' }}>
        {description}
      </Typography>
    </Box>
  )

  return (
    <Container
      maxWidth={false}
      sx={{ maxWidth: '100%', mt: '10px', px: '0 !important' }}
    >
      <Typography variant="h6" fontWeight={600}>
        Inventory Stats
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gap: '20px',
          mt: '20px',
          gridTemplateColumns: {
            xs: '1fr',          // 📱 Mobile → 1 card
            sm: '1fr 1fr',      // 📱 Tablet → 2 cards
            lg: '1fr 1fr 1fr',  // 💻 Desktop → 3 cards
          },
        }}
      >

        {renderStat(
          'Total Batches ',
          found,
          'Total batches count in warehouse.',
          'linear-gradient(105.13deg, #0B2E1F 0%, #124E35 55%, #1E7A55 100%)'
        )}

        {renderStat(
          'Total Products',
          removed,
          'Total products available currently in warehouse.',
          'linear-gradient(105.13deg, #002E2B 0%, #004F4A 55%, #007A73 100%)'
        )}

        {renderStat(
          'Total Demands',
          optOutSubmitted,
          'Total Demands from all service centers.',
          'linear-gradient(105.13deg, #0A2418 0%, #1E3D2B 55%, #355F45 100%)'
        )}
      </Box>
    </Container>
  )
}

export default AllBusinessStats
