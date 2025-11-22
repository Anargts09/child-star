'use client'

import * as React from 'react'
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles'
import { CacheProvider } from '@emotion/react'
import CssBaseline from '@mui/material/CssBaseline'
import { createTheme } from '@mui/material/styles'
import createEmotionCache from '@/utils/emotionCache'

const theme = createTheme({
  palette: {
    mode: 'light',
  },
})

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <CacheProvider value={clientSideEmotionCache}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline enableColorScheme />
        {children}
      </MuiThemeProvider>
    </CacheProvider>
  )
}

