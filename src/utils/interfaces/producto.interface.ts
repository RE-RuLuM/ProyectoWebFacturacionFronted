export interface ProductoForm {
  codigo: string;
  nombre: string;
  precio: number;
  stock : number;
}

export interface ProductoQueryParams {
  codigo?: string;
  nombre?: string;
}