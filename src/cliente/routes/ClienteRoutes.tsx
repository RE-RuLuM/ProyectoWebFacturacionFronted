import { Routes, Route } from 'react-router-dom'
import { ListadoClientes } from '../pages'

export const ClienteRoutes = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<ListadoClientes />} />
      </Routes>
    </>
  )
}
