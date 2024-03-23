import axios from '../axios'
import { environment } from '../../configuration/environment.development';
import { ClienteDTO, ResponseDTO } from '../dto';
import { ClienteForm } from '../../utils';

export const clienteService = {
  listarClientes(): Promise<ResponseDTO<ClienteDTO[]>> {
    const token = localStorage.getItem('token') || ''
    return axios.get<ResponseDTO<ClienteDTO[]>>(`${environment.apiUrl}/clientes`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(res => res.data)
  },
  obtenerClientePorId(id: number): Promise<ResponseDTO<ClienteDTO>> {
    const token = localStorage.getItem('token') || ''
    return axios.get<ResponseDTO<ClienteDTO>>(`${environment.apiUrl}/clientes/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(res => res.data)
  },
  crearCliente(body: ClienteForm): Promise<number> {
    const token = localStorage.getItem('token') || ''
    return axios.post<number>(`${environment.apiUrl}/clientes`, body, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(res => res.data)
  },
  actualizarCliente({id, body}: {id: number, body: ClienteForm}): Promise<number> {
    const token = localStorage.getItem('token') || ''
    return axios.put<number>(`${environment.apiUrl}/clientes/${id}`, body, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(res => res.data)
  },
  eliminarCliente({id}: {id: number}): Promise<number> {
    const token = localStorage.getItem('token') || ''
    return axios.delete<number>(`${environment.apiUrl}/clientes/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(res => res.data)
  }
}