'use client'

import * as React from 'react'
import DashboardLayout from './DashboardLayout'

interface DashboardProps {
  displayName?: string | null
  children?: React.ReactNode
}

export default function Dashboard({ displayName, children }: DashboardProps) {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  // Always render the same structure to avoid hydration mismatch
  return (
    <div suppressHydrationWarning>
      <div suppressHydrationWarning>
        {mounted ? (
          <DashboardLayout displayName={displayName}>{children}</DashboardLayout>
        ) : (
          <div style={{ display: 'flex', width: '100%', height: '100vh', alignItems: 'center', justifyContent: 'center' }}>
            <div>Loading...</div>
          </div>
        )}
      </div>
    </div>
  )
}

