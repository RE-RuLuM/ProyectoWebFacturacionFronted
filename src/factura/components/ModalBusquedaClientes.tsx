import { useQuery } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'

import { TablaCliente } from '.'
import { ModalBase } from '../../ui/components'
import { ClienteQueryParams } from '../../utils'
import { ClienteDTO, clienteService } from '../../infraestructure'

interface ModalBusquedaClientesProps {
  isActive: boolean;
  obtenerCliente: (it: ClienteDTO) => void;
  onCerrarModal: () => void;
}

export const ModalBusquedaClientes = ({ isActive, obtenerCliente, onCerrarModal }: ModalBusquedaClientesProps) => {

  const { register, getValues } = useForm<ClienteQueryParams>()

  const { data, isPending, refetch } = useQuery({
    queryKey: ['clientes'],
    queryFn: () => clienteService.listarClientes(getValues())
  })

  const buscarCliente = () => {
    refetch()
  }

  return (
    <ModalBase
      isActive={isActive}
      classes='w-2/4'
    >
      <>
        <div className='border border-violet-500 rounded-lg'>
          <div className='px-10 py-5'>
            <div className='flex flex-nowrap items-end gap-4 mb-2'>
              <div className='form-group w-1/2'>
                  <label className='label text-sm mb-2 tracking-wider' htmlFor="floatingInput">Razón social / Nombre Completo</label>
                  <input
                    type="text"
                    className='p-2 text-sm border-2 border-violet-500 rounded-md'
                    id="floatingInput"
                    autoComplete="off"
                    {...register('nombres')}
                  />
              </div>
              <div className='w-1/2'>
                <button 
                  className='bg-blue-600 text-white font-bold rounded-xl px-3 py-2 h-fit tracking-wider'
                  type="button"
                  onClick={buscarCliente}>
                  BUSCAR
                </button>
              </div>
            </div>
            <div className='flex flex-nowrap items-end gap-4'>
              <div className='form-group w-1/2'>
                  <label className='label text-sm mb-2 tracking-wider' htmlFor="floatingInput">Correo</label>
                  <input
                    type="text"
                    className='p-2 text-sm border-2 border-violet-500 rounded-md'
                    id="floatingInput"
                    autoComplete="off"
                    {...register('correo')}
                  />
              </div>
              <div className='form-group w-1/2'>
                  <label className='label text-sm mb-2 tracking-wider' htmlFor="floatingInput">RUC / DNI</label>
                  <input
                    type="text"
                    className='p-2 text-sm border-2 border-violet-500 rounded-md'
                    id="floatingInput"
                    autoComplete="off"
                    {...register('rucDNI')}
                  />
              </div>
            </div>
          </div>
        </div>
        <TablaCliente 
          isPending={isPending}
          data={data?.data}
          onClickRow={obtenerCliente}
        />
        <div className='footer flex gap-4 justify-end mt-4'>
          <button className='btn w-fit px-3 py-2 bg-red-500' onClick={onCerrarModal} type='button'>CERRAR</button>
        </div>
      </>
    </ModalBase>
  )
}
