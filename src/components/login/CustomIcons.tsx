import * as React from 'react'
import { SvgIcon, SvgIconProps } from '@mui/material'


export function SitemarkIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props} viewBox="0 0 32 32">
      <rect width="32" height="32" rx="4" fill="currentColor" />
      <path
        d="M16 8L10 14L16 20L22 14L16 8Z"
        fill="white"
      />
    </SvgIcon>
  )
}

