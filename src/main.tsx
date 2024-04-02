import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { PrismaneProvider } from '@prismane/core'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PrismaneProvider
    op={(theme) => (theme.mode === "dark" ? 0.2 : 0.5)}
    ><App /></PrismaneProvider>
  </React.StrictMode>,
)
