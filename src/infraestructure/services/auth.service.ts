import axios from 'axios'

import { AuthForm } from '../../utils';
import { environment } from '../../configuration/environment.development';
import { AuthDTO, ResponseDTO } from '../dto';

export const authService = {
  login(body: AuthForm): Promise<ResponseDTO<AuthDTO>> {
    return axios.post<ResponseDTO<AuthDTO>>(`${environment.apiUrl}/auth`, body)
      .then(res => {
        localStorage.setItem('token', res.data.data.token)
        return res.data
      })
  }
}