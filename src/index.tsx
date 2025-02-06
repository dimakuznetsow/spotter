import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { SearchProvider } from './SearchProvider.tsx'
import App from './App.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SearchProvider>
      <App />
    </SearchProvider>
  </StrictMode>,
)
