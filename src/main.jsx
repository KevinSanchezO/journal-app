import React from 'react'
import ReactDOM from 'react-dom/client'

import { JournalApp } from './JournalApp'

import './styles.css'
import { BrowserRouter } from 'react-router-dom'

/* To make the routes work the whole App must be surrounded by BrowserRouter */

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <JournalApp />
    </BrowserRouter>
  </React.StrictMode>,
)
