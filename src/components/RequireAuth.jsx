import { Navigate } from 'react-router'

const RequireAuth = ({ children }) => {
  const user = localStorage.getItem('user')
  if (!user) {
    return <Navigate to="/auth" replace />
  }
  return children
}

export default RequireAuth
