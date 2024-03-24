import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query'

import css from '../styles/login.module.css'

import { useForm } from 'react-hook-form';
import { AuthForm } from '../../utils';
import { authService } from '../../infraestructure';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<AuthForm>();
  const mutation = useMutation({
    mutationFn: authService.login,
    onSuccess: (data, variables, context) => {
      // TODO: store usuario
      navigate('/', {
        replace: true,
      });
    }
  })

  const onLogin = (body: AuthForm) => {
    mutation.mutate(body)
  }

  return (
    <div className={css.container}>
      <form onSubmit={handleSubmit(onLogin)}>
        <h1 className='text-6xl text-center text-blue-600 font-bold mb-4'>Control <br /> Ventas</h1>
        <div className='form-group'>
          <label className='label' htmlFor="floatingInput">Usuario</label>
          <input
            type="text"
            className='input'
            id="floatingInput"
            placeholder="Usuario"
            autoComplete="off"
            {...register('username', { required: true })}
          />
        </div>
        <div className='form-group'>
          <label className='label' htmlFor="floatingPassword">Contraseña</label>
          <input
            type="password"
            className='input'
            id="floatingPassword"
            placeholder="Password"
            {...register('password', { required: true })}
          />
        </div>
        <br />
        <button className='btn bg-blue-600' type="submit">
          INGRESAR
        </button>
      </form>
    </div>
  )
}
