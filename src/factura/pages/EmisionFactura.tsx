import { useState } from 'react'
import { ModalBusquedaClientes, FormularioProducto, ModalBusquedaProductos, TablaDetalleFactura } from '../components'
import { ClienteDTO, ProductoDTO, clienteService, facturaService } from '../../infraestructure'
import { ClienteForm, DetalleFacturaForm } from '../../utils'
import Swal from 'sweetalert2'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { MessageError, ModalBase } from '../../ui/components'
import { useForm } from 'react-hook-form'

export const EmisionFactura = () => {

  const mutation = useMutation({
    mutationFn: facturaService.emitirFactura,
    onSuccess: () => {
      Swal.fire("¡Registrado!", "", "success");
      setClienteSeleccionado(undefined)
      setDetalles([])
    }
  })

  const [isModalClienteOpen, setIsModalClienteOpen] = useState(false)

  const [isModalProductoOpen, setIsModalProductoOpen] = useState(false)

  const [clienteSeleccionado, setClienteSeleccionado] = useState<ClienteDTO>()

  const [productoSeleccionado, setProductoSeleccionado] = useState<ProductoDTO>()

  const [detalles, setDetalles] = useState<DetalleFacturaForm[]>([])

  const [isModalCrearClienteOpen, setIsModalCrearClienteOpen] = useState(false)

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ClienteForm>()

  const queryClient = useQueryClient()

  const mutationCreate = useMutation({
    mutationFn: clienteService.crearCliente,
    onSuccess: () => {
      setIsModalCrearClienteOpen(false)
      queryClient.invalidateQueries({ queryKey: ['clientes'] })
    }
  })

  const crearCliente = (body: ClienteForm) => {
    mutationCreate.mutate(body)
    reset()
  }

  return (
    <>
      <ModalBase
        isActive={isModalCrearClienteOpen}
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
                setIsModalCrearClienteOpen(false)
            }} type='button'>CERRAR</button>
          </div>
        </form>
        </>
      </ModalBase>
      <ModalBusquedaClientes
        isActive={isModalClienteOpen}
        obtenerCliente={(cliente) => {
          setClienteSeleccionado(cliente)
          setIsModalClienteOpen(false)
        }}
        onCerrarModal={() => {
          setIsModalClienteOpen(false)
        }}
      />
      <ModalBusquedaProductos
        isActive={isModalProductoOpen}
        obtenerProducto={(producto) => {
          setProductoSeleccionado(producto)
          setIsModalProductoOpen(false)
        }}
        onCerrarModal={() => {
          setIsModalProductoOpen(false)
        }}
      />
      <div className='w-11/12'>
        {/* Informacion cliente */}
        <fieldset className='border border-violet-500 rounded-lg pl-5 mb-5'>
          <legend className='text-violet-500 font-bold text-lg px-4'>CLIENTE</legend>
          <div className='px-20 py-10'>
            <div className='flex flex-nowrap items-end gap-4 mb-2'>
              <div className='form-group w-1/2'>
                  <label className='label text-sm mb-2 tracking-wider' htmlFor="floatingInput">Razón social / Nombre Completo</label>
                  <input
                    type="text"
                    className='p-2 text-sm border-2 border-violet-500 rounded-md'
                    id="floatingInput"
                    autoComplete="off"
                    value={clienteSeleccionado?.nombres ?? ''}
                    readOnly
                  />
              </div>
              <div className='w-1/2'>
                <button 
                  className='bg-blue-600 text-white font-bold rounded-xl px-3 py-2 h-fit tracking-wider mr-4' 
                  onClick={() => { setIsModalClienteOpen(true) }}
                  type="button">
                  BUSCAR
                </button>
                <button 
                  className='bg-blue-600 text-white font-bold rounded-xl px-3 py-2 h-fit tracking-wider' 
                  onClick={() => { setIsModalCrearClienteOpen(true) }}
                  type="button">
                  CREAR CLIENTE
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
                    value={clienteSeleccionado?.correo ?? ''}
                    readOnly
                  />
              </div>
              <div className='form-group w-1/2'>
                  <label className='label text-sm mb-2 tracking-wider' htmlFor="floatingInput">RUC / DNI</label>
                  <input
                    type="text"
                    className='p-2 text-sm border-2 border-violet-500 rounded-md'
                    id="floatingInput"
                    autoComplete="off"
                    value={clienteSeleccionado?.rucDni ?? ''}
                    readOnly
                  />
              </div>
            </div>
          </div>
        </fieldset>
        {/* Detalle de factura */}
        {/* Formulario Producto */}
        <FormularioProducto
          onAgregarProducto={(cantidad) => {
            if (productoSeleccionado != null) {
              setDetalles((it) => [...it, {
                codigoProducto: productoSeleccionado.codigo,
                nombreProducto: productoSeleccionado.nombre,
                cantidad,
                precio: productoSeleccionado.precio
              }])
              setProductoSeleccionado(undefined)
            }
          }}
          producto={productoSeleccionado}
          onBuscarProducto={() => {
            setIsModalProductoOpen(true)
          }}
        />
        <div className='flex justify-end w-full mt-4'>
          <button
            className='bg-violet-600 text-white font-bold rounded-xl px-3 py-2 h-fit tracking-wider'
            disabled={mutation.isPending} 
            onClick={async () => {
              if (clienteSeleccionado == null) {
                Swal.fire({
                  icon: "warning",
                  title: "Advertencia",
                  text: "No ha seleccionado un cliente",
                });
                return
              }

              if (detalles.length === 0) {
                Swal.fire({
                  icon: "warning",
                  title: "Advertencia",
                  text: "Debe agregar al menos un producto en su factura",
                });
                return
              }

              const result = await Swal.fire({
                title: "¿Deseas registrar esta factura?",
                showDenyButton: true,
                confirmButtonText: "CONTINUAR",
                denyButtonText: `CANCELAR`
              });

              if (result.isConfirmed) {
                mutation.mutate({
                  clienteId: clienteSeleccionado.id,
                  detalles
                })
              }
            }}
            type="button">
            REGISTRAR FACTURA
          </button>
        </div>
        <TablaDetalleFactura
          data={detalles}
          onEliminar={(detalle) => {
            const detallesModificado = detalles.filter(x => x.codigoProducto !== detalle.codigoProducto)
            setDetalles(detallesModificado)
          }}
        />
      </div>
    </>
  )
}
