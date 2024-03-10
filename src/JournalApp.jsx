import React from 'react'
import { AppRouter } from './router/AppRouter'
import { AppTheme } from './theme'

/* To implement the theme of mui the AppTheme must surround the app, 
in this case the AppRouter that manages the routes*/

export const JournalApp = () => {
  return (
    <AppTheme>
        <AppRouter />
    </AppTheme>
  )
}
