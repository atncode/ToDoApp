import { createBrowserRouter } from 'react-router'
import SignupPage from './pages/SignupPage'
import AuthPage from './pages/AuthPage'
import RequireAuth from './components/RequireAuth'
import TodoListPage from './pages/ToDoListPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <RequireAuth><TodoListPage /></RequireAuth>,
  },
  {
    path: '/auth',
    element: <AuthPage />,
  },
  {
    path: '/signup',
    element: <SignupPage />,
  },
])

export default router
