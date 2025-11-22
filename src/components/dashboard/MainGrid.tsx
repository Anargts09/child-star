'use client'

import Grid from '@mui/material/GridLegacy'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  minHeight: 200,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
}))

export default function MainGrid() {
  return (
    <Box sx={{ width: '100%', maxWidth: 1200 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <Item>
            <Typography variant="h6" gutterBottom>
              Total Users
            </Typography>
            <Typography variant="h3" component="div">
              0
            </Typography>
          </Item>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Item>
            <Typography variant="h6" gutterBottom>
              Active Sessions
            </Typography>
            <Typography variant="h3" component="div">
              0
            </Typography>
          </Item>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Item>
            <Typography variant="h6" gutterBottom>
              Total Revenue
            </Typography>
            <Typography variant="h3" component="div">
              $0
            </Typography>
          </Item>
        </Grid>
        <Grid item xs={12}>
          <Item>
            <Typography variant="h6" gutterBottom>
              Recent Activity
            </Typography>
            <Typography variant="body2" color="text.secondary">
              No recent activity to display.
            </Typography>
          </Item>
        </Grid>
      </Grid>
    </Box>
  )
}

