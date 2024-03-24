import { DetalleFacturaDTO } from '../../infraestructure'

export const calcularSubTotal = (detalles: DetalleFacturaDTO[]) => {
  return detalles.map(it => it.subTotal).reduce((prev, current) => prev + current, 0)
}

export const calcularIgv = (detalles: DetalleFacturaDTO[], porcentaje: number) => {
  return calcularSubTotal(detalles) * porcentaje
}

export const calcularTotal = (detalles: DetalleFacturaDTO[]) => {
  return calcularSubTotal(detalles) + calcularIgv(detalles, 0.18)
}