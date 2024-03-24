import { FacturaDTO, ResponseDTO } from '..'
import { environment } from '../../configuration/environment.development'
import { FacturaForm } from '../../utils'
import axios from '../axios'


export const facturaService = {
  emitirFactura(body: FacturaForm): Promise<ResponseDTO<FacturaDTO>> {
    const token = localStorage.getItem('token') || ''
    return axios.post<ResponseDTO<FacturaDTO>>(`${environment.apiUrl}/facturas`, body, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(res => res.data)
  },
  listarFacturas(): Promise<ResponseDTO<FacturaDTO[]>> {
    const token = localStorage.getItem('token') || ''
    return axios.get<ResponseDTO<FacturaDTO[]>>(`${environment.apiUrl}/facturas`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(res => res.data)
  },
  obtenerFacturaPorId(id: number): Promise<ResponseDTO<FacturaDTO>> {
    const token = localStorage.getItem('token') || ''
    return axios.get<ResponseDTO<FacturaDTO>>(`${environment.apiUrl}/facturas/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(res => res.data)
  },
  eliminarFactura({ id }: { id: number}): Promise<number> {
    const token = localStorage.getItem('token') || ''
    return axios.delete<number>(`${environment.apiUrl}/facturas/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(res => res.data)
  }
}