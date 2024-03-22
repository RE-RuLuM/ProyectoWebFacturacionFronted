import { NavBar } from '../ui/components/NavBar'
import { Outlet, Route, Routes } from 'react-router-dom'
import { LoginPage } from '../auth'
import { PrivateRoute } from './PrivateRoute'
import { ClienteRoutes } from '../cliente'
import { ProductoRoutes } from '../producto'
import { FacturaRoutes } from '../factura'

export const AppRouter = () => {
  function Dashboard() {
    return (<>
      <NavBar />
      <br />
      <Outlet />
    </>)
  }

  return (
    <>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path='/*' element={<Dashboard />}>
            <Route path="clientes/*" element={<ClienteRoutes/>} />
            <Route path="productos/*" element={<ProductoRoutes/>} />
            <Route path="facturas/*" element={<FacturaRoutes />} />
          </Route>
        </Route>
        <Route path="login" element={<LoginPage />} />
      </Routes>
    </>
  )
}
