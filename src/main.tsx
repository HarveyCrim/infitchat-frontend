import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './redux/store.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
})

createRoot(document.getElementById('root')!).render(
    <QueryClientProvider client={client}>
      <Provider store = {store}>
        <StrictMode>
          <App />
        </StrictMode>,
      </Provider>
  </QueryClientProvider>
)
