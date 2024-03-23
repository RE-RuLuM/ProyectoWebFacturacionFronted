import { Outlet, Route, Routes } from 'react-router-dom'
import { NavBar } from '../ui/components/NavBar'
import { LoginPage } from '../auth'
import { PrivateRoute } from './PrivateRoute'
import { ClienteRoutes } from '../cliente'
import { ProductoRoutes } from '../producto'
import { FacturaRoutes } from '../factura'

export const AppRouter = () => {
  function Dashboard() {
    return (<>
      <main style={{ display: 'flex' }}>
        <NavBar />
        <div style={{ width: '80%', display: 'flex', justifyContent: 'center', alignItems: 'start', marginTop: 50 }}>
          <Outlet />
        </div>
      </main>
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
