'use client'

import * as React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import Typography from '@mui/material/Typography'
import Alert from '@mui/material/Alert'
import { createClient } from '@/utils/supabase/client'

interface ForgotPasswordProps {
  open: boolean
  handleClose: () => void
}

export default function ForgotPassword({
  open,
  handleClose,
}: ForgotPasswordProps) {
  const [email, setEmail] = React.useState('')
  const [emailError, setEmailError] = React.useState(false)
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [success, setSuccess] = React.useState(false)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError(true)
      setEmailErrorMessage('Please enter a valid email address.')
      return
    }

    setLoading(true)
    setEmailError(false)
    setEmailErrorMessage('')

    try {
      const supabase = createClient()
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      })

      if (error) {
        setEmailError(true)
        setEmailErrorMessage(error.message)
      } else {
        setSuccess(true)
        setTimeout(() => {
          handleClose()
          setSuccess(false)
          setEmail('')
        }, 2000)
      }
    } catch (error) {
      setEmailError(true)
      setEmailErrorMessage('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Reset password</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          {success ? (
            <Alert severity="success" sx={{ mb: 2 }}>
              Password reset link has been sent to your email address.
            </Alert>
          ) : (
            <>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Enter your email address and we will send you a link to reset your
                password.
              </Typography>
              <FormControl fullWidth>
                <FormLabel htmlFor="reset-email">Email</FormLabel>
                <TextField
                  error={emailError}
                  helperText={emailErrorMessage}
                  id="reset-email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    setEmailError(false)
                    setEmailErrorMessage('')
                  }}
                  autoFocus
                  required
                  fullWidth
                  variant="outlined"
                  disabled={loading}
                />
              </FormControl>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={loading}>
            {success ? 'Close' : 'Cancel'}
          </Button>
          {!success && (
            <Button type="submit" variant="contained" disabled={loading}>
              {loading ? 'Sending...' : 'Send reset link'}
            </Button>
          )}
        </DialogActions>
      </form>
    </Dialog>
  )
}

