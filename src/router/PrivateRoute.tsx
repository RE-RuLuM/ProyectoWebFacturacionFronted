import { parseJwt } from '../utils'
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export const PrivateRoute = () => {
  const token = localStorage.getItem('token')  || ''

  const payload = parseJwt(token)

  const location = useLocation()

  return payload?.unique_name ? (
    <Outlet />
  ) : (
    <Navigate to='login' state={{ from: location }} replace />
  )
}
