import { useState } from 'react';
import { ProductoDTO } from '../../infraestructure'
import Swal from 'sweetalert2';

interface FormularioProductoProps {
  onAgregarProducto : (cantidad: number) => void;
  onBuscarProducto  : () => void;
  producto         ?: ProductoDTO;
}

export const FormularioProducto = ({onAgregarProducto, onBuscarProducto, producto} : FormularioProductoProps) => {
  
  const [cantidadIndicada, setCantidadIndicada] = useState(1)

  return (
    <>
      
      <div className='border border-violet-500 rounded-lg'>
        <div className='px-24 py-5'>
          <div className='flex flex-nowrap items-end gap-4 mb-2'>
            <div className='form-group w-1/2'>
                <label className='label text-sm mb-2 tracking-wider' htmlFor="floatingInput">Código Producto</label>
                <input
                  type="text"
                  className='p-2 text-sm border-2 border-violet-500 rounded-md'
                  id="floatingInput"
                  autoComplete="off"
                  value={producto?.codigo ?? ''}
                  readOnly
                  disabled={true}
                />
            </div>
            <div className='w-1/2'>
              <button 
                className='bg-blue-600 text-white font-bold rounded-xl px-3 py-2 h-fit tracking-wider'
                type="button"
                onClick={onBuscarProducto}>
                BUSCAR
              </button>
            </div>
          </div>
          <div className='flex items-end gap-4 mb-6'>
            <div className='form-group w-1/2'>
                <label className='label text-sm mb-2 tracking-wider' htmlFor="floatingInput">Nombre Producto</label>
                <input
                  type="text"
                  className='p-2 text-sm border-2 border-violet-500 rounded-md'
                  id="floatingInput"
                  autoComplete="off"
                  value={producto?.nombre  ?? ''}
                  readOnly
                  disabled={true}
                />
            </div>
            <div className='form-group w-1/4'>
                <label className='label text-sm mb-2 tracking-wider' htmlFor="floatingInput">Stock</label>
                <input
                  type="text"
                  className='p-2 text-sm border-2 border-violet-500 rounded-md'
                  id="floatingInput"
                  autoComplete="off"
                  value={producto?.stock  ?? ''}
                  readOnly
                  disabled={true}
                />
            </div>
            <div className='form-group w-1/4'>
                <label className='label text-sm mb-2 tracking-wider' htmlFor="floatingInput">Precio</label>
                <input
                  type="text"
                  className='p-2 text-sm border-2 border-violet-500 rounded-md'
                  id="floatingInput"
                  autoComplete="off"
                  value={producto?.precio  ?? ''}
                  readOnly
                  disabled={true}
                />
            </div>
          </div>
          <div className='flex justify-between'>
            <div className='flex items-center gap-4 w-1/2'>
                <label className='label text-sm mb-2 tracking-wider' htmlFor="floatingInput">Cantidad a Escoger: </label>
                <input
                  type="text"
                  className='p-2 text-sm border-2 border-violet-500 rounded-md'
                  id="floatingInput"
                  autoComplete="off"
                  value={cantidadIndicada}
                  onChange={(e) => {
                    setCantidadIndicada(+e.target.value)
                  }}
                />
            </div>
            <div className='flex justify-end w-1/2'>
              <button 
                className='bg-blue-600 text-white font-bold rounded-xl px-3 py-2 h-fit tracking-wider'
                type="button"
                onClick={() => {
                  if (producto == null) {
                    Swal.fire({
                      icon: "warning",
                      title: "Advertencia",
                      text: "No ha seleccionado un producto",
                    });
                    return
                  }

                  if (cantidadIndicada > producto.stock) {
                    Swal.fire({
                      icon: "warning",
                      title: "Advertencia",
                      text: "La cantidad seleccionada es mayor al stock disponible",
                    });
                    return
                  }

                  if (cantidadIndicada === 0) {
                    Swal.fire({
                      icon: "warning",
                      title: "Advertencia",
                      text: "La cantidad debe ser mayor que 0 y menor que el stock disponible",
                    });
                    return
                  }

                  onAgregarProducto(cantidadIndicada)
                  setCantidadIndicada(1)
                }}>
                AGREGAR PRODUCTO
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
