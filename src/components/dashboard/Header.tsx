'use client'

import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

interface HeaderProps {
  displayName?: string | null
}

export default function Header({ displayName }: HeaderProps) {
  return (
    <Box sx={{ width: '100%', maxWidth: 1200 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome back{displayName ? `, ${displayName}` : ''}!
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Here&apos;s what&apos;s happening with your account today.
      </Typography>
    </Box>
  )
}

