import { Routes, Route } from 'react-router-dom'
import { EmisionFactura } from '../pages'

export const FacturaRoutes = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<EmisionFactura />} />
      </Routes>
    </>
  )
}
