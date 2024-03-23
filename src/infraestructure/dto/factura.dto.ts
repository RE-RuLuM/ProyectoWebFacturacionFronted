import { ClienteDTO } from '.';

export interface FacturaDTO {
  id: number;
  numeroFactura: string;
  clienteId: string;
  cliente: ClienteDTO;
  detalles: DetalleFacturaDTO[]
}

export interface DetalleFacturaDTO {
  id: number;
  facturaId: number;
  codigoProducto: string;
  nombreProducto: string;
  precio: number;
  cantidad: number;
  subTotal: number;
}