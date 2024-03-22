import { Routes, Route } from 'react-router-dom'
import { ListadoProductos } from '../pages'

export const ProductoRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<ListadoProductos />} />
    </Routes>
  )
}
