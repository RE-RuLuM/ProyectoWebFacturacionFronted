import { useEffect, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'

import { ButtonIconBase, ColumnBase, MessageError, ModalBase, TableBase } from '../../ui/components'
import { ClienteDTO, clienteService } from '../../infraestructure'
import { ClienteForm } from '../../utils'
import Swal from 'sweetalert2'

export const ListadoClientes = () => {
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<ClienteForm>();
  const [clienteId, setClienteId] = useState(0)
  const [accion, setAccion] = useState('crear')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const queryClient = useQueryClient()
  const { data, isPending } = useQuery({ queryKey: ['clientes'], queryFn: () => clienteService.listarClientes() })
  const {data: dataCliente} = useQuery({ 
    queryKey: ['cliente', clienteId], 
    queryFn: () => clienteService.obtenerClientePorId(clienteId), 
    enabled: !!clienteId,
  })
  const mutationCreate = useMutation({
    mutationFn: clienteService.crearCliente,
    onSuccess: () => {
      setIsModalOpen(false)
      queryClient.invalidateQueries({ queryKey: ['clientes'] })
    }
  })

  const mutationUpdate = useMutation({
    mutationFn: clienteService.actualizarCliente,
    onSuccess: () => {
      setIsModalOpen(false)
      queryClient.invalidateQueries({ queryKey: ['clientes'] })
    }
  })

  const mutationDelete = useMutation({
    mutationFn: clienteService.eliminarCliente,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clientes'] })
    }
  })

  useEffect(() => {
    if (dataCliente != null) {
      const { rucDni, nombres, correo, direccion } = dataCliente.data as ClienteDTO
      setValue('rucDni', rucDni)
      setValue('nombres', nombres)
      setValue('direccion', direccion)
      setValue('correo', correo)
    }
  }, [dataCliente])

  useEffect(() => {
    return () => {
      queryClient.cancelQueries({ queryKey: ['clientes'] })
    }
  }, [])

  const crearCliente = (body: ClienteForm) => {
    if(accion == 'crear') {
      mutationCreate.mutate(body)
    } else if (accion == 'actualizar') {
      mutationUpdate.mutate({ id: clienteId, body })
    }
    reset()
  }

  return (<>
      <ModalBase
        isActive={isModalOpen}
        classes='w-1/3'
      >
        <>
        <form onSubmit={handleSubmit(crearCliente)}>
          <div className='form-group'>
            <label className='label text-sm' htmlFor="floatingInput">RUC / DNI</label>
            <input
              type="text"
              className='p-2 text-sm border-2 border-violet-500 rounded-sm'
              id="floatingInput"
              placeholder="RUC / DNI"
              autoComplete="off"
              {...register('rucDni', { required: true, minLength: 8, maxLength: 15 })}
            />
            {
              errors.rucDni
              &&
              <MessageError text='El campo tiene un valor inválido' />
            }
          </div>
          <div className='form-group'>
            <label className='label text-sm' htmlFor="floatingInput">Nombres</label>
            <input
              type="text"
              className='p-2 text-sm rounded-sm border-2 border-violet-500'
              id="floatingInput"
              placeholder="Nombres"
              autoComplete="off"
              {...register('nombres', { required: true })}
            />
            {
              errors.nombres
              &&
              <MessageError text='El campo es obligatorio' />
            }
          </div>
          <div className='form-group'>
            <label className='label text-sm' htmlFor="floatingInput">Dirección</label>
            <input
              type="text"
              className='p-2 text-sm rounded-sm border-2 border-violet-500'
              id="floatingInput"
              placeholder="Dirección"
              autoComplete="off"
              {...register('direccion', { required: true })}
            />
            {
              errors.direccion
              &&
              <MessageError text='El campo es obligatorio' />
            }
          </div>
          <div className='form-group'>
            <label className='label text-sm' htmlFor="floatingInput">Correo</label>
            <input
              type="text"
              className='p-2 text-sm rounded-sm border-2 border-violet-500'
              id="floatingInput"
              placeholder="Correo"
              autoComplete="off"
              {...register('correo', { required: true, pattern: /\S+@\S+\.\S+/ })}
            />
            {
              errors.correo
              &&
              <MessageError text='No es un correo válido' />
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
            'DOCUMENTO': true,
            'NOMBRE': true,
            'DIRECCIÓN': true,
            'CORREO': true,
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
                    <ColumnBase {...attribute('DOCUMENTO')}>{it.rucDni}</ColumnBase>
                    <ColumnBase {...attribute('NOMBRE')}>{it.nombres}</ColumnBase>
                    <ColumnBase {...attribute('DIRECCIÓN')}>{it.direccion}</ColumnBase>
                    <ColumnBase {...attribute('CORREO')}>{it.correo}</ColumnBase>
                    <ColumnBase {...attribute('ACCIÓN')}>
                      <ButtonIconBase
                        accion="editar"
                        onClick={() => {
                          setAccion('actualizar')
                          setClienteId(it.id)
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
