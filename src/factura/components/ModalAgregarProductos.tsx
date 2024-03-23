import { useQuery } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'

import { ModalBase } from '../../ui/components'
import { ProductoQueryParams } from '../../utils'
import { ProductoDTO, productoService } from '../../infraestructure'
import { TablaProducto } from './TablaProducto'

interface ModalAgregarProductosProps {
  isActive: boolean;
  obtenerProducto: (it: ProductoDTO) => void;
  onCerrarModal: () => void;
}

export const ModalAgregarProductos = ({ isActive, obtenerProducto, onCerrarModal }: ModalAgregarProductosProps) => {

  const { register, getValues } = useForm<ProductoQueryParams>()
  

  const { data, isPending, refetch } = useQuery({
    queryKey: ['productos'],
    queryFn: () => productoService.listarProductos(getValues())
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
                  <label className='label text-sm mb-2 tracking-wider' htmlFor="floatingInput">Código Producto</label>
                  <input
                    type="text"
                    className='p-2 text-sm border-2 border-violet-500 rounded-md'
                    id="floatingInput"
                    autoComplete="off"
                    {...register('codigo')}
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
                  <label className='label text-sm mb-2 tracking-wider' htmlFor="floatingInput">Nombre Producto</label>
                  <input
                    type="text"
                    className='p-2 text-sm border-2 border-violet-500 rounded-md'
                    id="floatingInput"
                    autoComplete="off"
                    {...register('nombre')}
                  />
              </div>
            </div>
          </div>
        </div>
        <TablaProducto 
          isPending={isPending}
          data={data?.data}
          onClickRow={obtenerProducto}
        />
        <div className='footer flex gap-4 justify-end mt-4'>
          <button className='btn w-fit px-3 py-2 bg-red-500' onClick={onCerrarModal} type='button'>CERRAR</button>
        </div>
      </>
    </ModalBase>
  )
}
