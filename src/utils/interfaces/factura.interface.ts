export interface FacturaForm {
  clienteId: number;
  detalles : DetalleFacturaForm[];
}

export interface DetalleFacturaForm {
  codigoProducto: string;
  nombreProducto: string;
  precio         : number;
  cantidad       : number;
}