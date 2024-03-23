import { useState } from 'react'
import { ModalBusquedaClientes, FormularioProducto, ModalBusquedaProductos, TablaDetalleFactura } from '../components'
import { ClienteDTO, ProductoDTO, facturaService } from '../../infraestructure'
import { DetalleFacturaForm } from '../../utils'
import Swal from 'sweetalert2'
import { useMutation } from '@tanstack/react-query'

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

  return (
    <>
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
                  className='bg-blue-600 text-white font-bold rounded-xl px-3 py-2 h-fit tracking-wider' 
                  onClick={() => { setIsModalClienteOpen(true) }}
                  type="button">
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
