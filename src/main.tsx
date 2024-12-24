import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './global.css'
import { HomeService } from './pages/Home/home-service'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Toaster } from './components/ui/toaster'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <HomeService />
      <Toaster />
    </QueryClientProvider>
  </StrictMode>
)
