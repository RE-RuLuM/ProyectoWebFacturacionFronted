import axios from '../axios'
import { environment } from '../../configuration/environment.development';
import { ProductoDTO, ResponseDTO } from '../dto';
import { ProductoForm } from '../../utils';

export const productoService = {
  listarProductos(): Promise<ResponseDTO<ProductoDTO[]>> {
    const token = localStorage.getItem('token') || ''
    return axios.get<ResponseDTO<ProductoDTO[]>>(`${environment.apiUrl}/productos`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(res => res.data)
  },
  obtenerProductoPorId(id: number): Promise<ResponseDTO<ProductoDTO>> {
    const token = localStorage.getItem('token') || ''
    return axios.get<ResponseDTO<ProductoDTO>>(`${environment.apiUrl}/productos/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(res => res.data)
  },
  crearProducto(body: ProductoForm): Promise<number> {
    const token = localStorage.getItem('token') || ''
    return axios.post<number>(`${environment.apiUrl}/productos`, body, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(res => res.data)
  },
  actualizarProducto({id, body}: {id: number, body: ProductoForm}): Promise<number> {
    const token = localStorage.getItem('token') || ''
    return axios.put<number>(`${environment.apiUrl}/productos/${id}`, body, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(res => res.data)
  },
  eliminarProducto({id}: {id: number}): Promise<number> {
    const token = localStorage.getItem('token') || ''
    return axios.delete<number>(`${environment.apiUrl}/productos/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(res => res.data)
  }
}