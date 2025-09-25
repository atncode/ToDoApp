import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'
import router from './router.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import NotificationProvider from './components/NotificationProvider.jsx'
import './main.css'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <NotificationProvider>
      <RouterProvider router={router} />
    </NotificationProvider>
  </Provider>,
)
