import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './redux/store.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import SocketProvider from './context/SocketProvider.tsx'

const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
})

createRoot(document.getElementById('root')!).render(
  <SocketProvider backend_url={import.meta.env.VITE_BACKEND_URL}>
    <QueryClientProvider client={client}>
      <Provider store = {store}>
          <App />
      </Provider>
  </QueryClientProvider>
  </SocketProvider>
)
