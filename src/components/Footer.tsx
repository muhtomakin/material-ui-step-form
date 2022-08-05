import React from 'react'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'

export default function Footer() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Toma © '}
      <Link
        color="inherit"
        href="#"
      >
        Github
      </Link>
    </Typography>
  )
}