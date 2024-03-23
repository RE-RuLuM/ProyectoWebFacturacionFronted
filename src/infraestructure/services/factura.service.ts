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
  }
}