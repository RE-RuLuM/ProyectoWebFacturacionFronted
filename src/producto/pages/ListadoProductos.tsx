import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

import { ButtonIconBase, ColumnBase, MessageError, ModalBase, TableBase } from '../../ui/components';
import { ProductoForm } from '../../utils';
import { ProductoDTO, productoService } from '../../infraestructure';

export const ListadoProductos = () => {
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<ProductoForm>();
  const [productoId, setProductoId] = useState(0)
  const [accion, setAccion] = useState('crear')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const queryClient = useQueryClient()
  const { data, isPending } = useQuery({ queryKey: ['productos'], queryFn: () => productoService.listarProductos() })
  const {data: dataProducto} = useQuery({ 
    queryKey: ['producto', productoId], 
    queryFn: () => productoService.obtenerProductoPorId(productoId), 
    enabled: !!productoId,
  })
  const mutationCreate = useMutation({
    mutationFn: productoService.crearProducto,
    onSuccess: () => {
      setIsModalOpen(false)
      queryClient.invalidateQueries({ queryKey: ['productos'] })
    }
  })

  const mutationUpdate = useMutation({
    mutationFn: productoService.actualizarProducto,
    onSuccess: () => {
      setIsModalOpen(false)
      queryClient.invalidateQueries({ queryKey: ['productos'] })
    }
  })

  const mutationDelete = useMutation({
    mutationFn: productoService.eliminarProducto,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['productos'] })
    }
  })

  useEffect(() => {
    if (dataProducto != null) {
      const { codigo, nombre, precio, stock } = dataProducto.data as ProductoDTO
      setValue('codigo', codigo)
      setValue('nombre', nombre)
      setValue('precio', precio)
      setValue('stock', stock)
    }
  }, [dataProducto])

  useEffect(() => {
    return () => {
      queryClient.cancelQueries({ queryKey: ['productos'] })
    }
  }, [])

  const crearProducto = (body: ProductoForm) => {
    if(accion == 'crear') {
      mutationCreate.mutate(body)
    } else if (accion == 'actualizar') {
      mutationUpdate.mutate({ id: productoId, body })
    }
    reset()
  }

  return (<>
      <ModalBase
        isActive={isModalOpen}
        classes='w-1/3'
      >
        <>
        <form onSubmit={handleSubmit(crearProducto)}>
          <div className='form-group'>
            <label className='label text-sm' htmlFor="floatingInput">Código</label>
            <input
              type="text"
              className='p-2 text-sm border-2 border-violet-500 rounded-sm'
              id="floatingInput"
              placeholder="Código"
              autoComplete="off"
              {...register('codigo', { required: true, maxLength: 15 })}
            />
            {
              errors.codigo
              &&
              <MessageError text='El campo tiene un valor inválido' />
            }
          </div>
          <div className='form-group'>
            <label className='label text-sm' htmlFor="floatingInput">Nombre</label>
            <input
              type="text"
              className='p-2 text-sm rounded-sm border-2 border-violet-500'
              id="floatingInput"
              placeholder="Nombre"
              autoComplete="off"
              {...register('nombre', { required: true })}
            />
            {
              errors.nombre
              &&
              <MessageError text='El campo es obligatorio' />
            }
          </div>
          <div className='form-group'>
            <label className='label text-sm' htmlFor="floatingInput">Precio</label>
            <input
              type="text"
              className='p-2 text-sm rounded-sm border-2 border-violet-500'
              id="floatingInput"
              placeholder="Precio"
              autoComplete="off"
              {...register('precio', { required: true })}
            />
            {
              errors.precio
              &&
              <MessageError text='El campo es obligatorio' />
            }
          </div>
          <div className='form-group'>
            <label className='label text-sm' htmlFor="floatingInput">Stock</label>
            <input
              type="text"
              className='p-2 text-sm rounded-sm border-2 border-violet-500'
              id="floatingInput"
              placeholder="Stock"
              autoComplete="off"
              {...register('stock', { required: true })}
            />
            {
              errors.stock
              &&
              <MessageError text='El campo es obligatorio' />
            }
          </div>
          <div className='footer flex gap-4 justify-end mt-4'>
            <button className='btn bg-blue-600 w-1/4' style={{ padding: '10px 2px'}} type='submit'>ACEPTAR</button>
            <button className='btn w-1/4 bg-red-500' style={{ padding: '10px 2px'}} onClick={() => {
                setIsModalOpen(false)
            }} type='button'>CERRAR</button>
          </div>
        </form>
        </>
      </ModalBase>
      <div className='w-3/6'>
        <div className='container' style={{ display: 'flex', justifyContent: 'end' }}>
          <button className='btn' style={{ width: 150, padding: '10px 5px'}} onClick={() => {
            setIsModalOpen(true)
            setAccion('crear')
            }}>+ NUEVO</button>
        </div>
        <TableBase
          cabeceras={{
            'N°': true,
            'CÓDIGO': true,
            'NOMBRE': true,
            'PRECIO': true,
            'STOCK': true,
            'ACCIÓN': true,
          }}
          isLoading={isPending}
          hasPagination={true}
          itemsPerPage={10}
          totalItems={data?.data.length}
        >
          {
            (attribute, cabeceras, indexOfFirstItem, indexOfLastItem) => (<>
              {
                data?.data.map((it, index) => (
                  <tr key={it.id}>
                    <ColumnBase {...attribute('N°')}>{index + 1}</ColumnBase>
                    <ColumnBase {...attribute('CÓDIGO')}>{it.codigo}</ColumnBase>
                    <ColumnBase {...attribute('NOMBRE')}>{it.nombre}</ColumnBase>
                    <ColumnBase {...attribute('PRECIO')}>{it.precio}</ColumnBase>
                    <ColumnBase {...attribute('STOCK')}>{it.stock}</ColumnBase>
                    <ColumnBase {...attribute('ACCIÓN')}>
                      <ButtonIconBase
                        accion="editar"
                        onClick={() => {
                          setAccion('actualizar')
                          setProductoId(it.id)
                          setIsModalOpen(true)
                        }}
                      />
                      <ButtonIconBase
                        accion="eliminar"
                        onClick={ async () => {
                          const result = await Swal.fire({
                            title: "¿Deseas eliminar este registro?",
                            showDenyButton: true,
                            confirmButtonText: "ELIMINAR",
                            denyButtonText: `CANCELAR`
                          });

                          if (result.isConfirmed) {
                            mutationDelete.mutate({ id: it.id })
                            Swal.fire("¡Eliminado!", "", "success");
                          }
                        }}
                      />
                    </ColumnBase>
                  </tr>
                )).slice(indexOfFirstItem, indexOfLastItem)
              }
            </>)
          }
        </TableBase>
      </div>
    </>
  )
}
