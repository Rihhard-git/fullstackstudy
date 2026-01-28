import { createRoot } from 'react-dom/client'
import App from './App'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NotificationContextProvider } from './NotificationContext'
import { StrictMode } from 'react'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    
      <NotificationContextProvider>
      <App />
    </NotificationContextProvider> 
    
    
  </QueryClientProvider>
  
)