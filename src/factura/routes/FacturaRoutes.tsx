import { Routes, Route } from 'react-router-dom'
import { EmisionFactura, ListadoFacturas } from '../pages'

export const FacturaRoutes = () => {
  return (
    <>
      <Routes>
        <Route path='/emision' element={<EmisionFactura />} />
        <Route path='/' element={<ListadoFacturas />} />
      </Routes>
    </>
  )
}
