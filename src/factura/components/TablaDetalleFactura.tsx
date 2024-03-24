import Swal from 'sweetalert2';
import { ButtonIconBase, ColumnBase, TableBase } from '../../ui/components'
import { DetalleFacturaForm, calcularIgv, calcularSubTotal, calcularTotal } from '../../utils'

interface TablaDetalleFacturaProps {
  data: DetalleFacturaForm[],
  onEliminar: (item: DetalleFacturaForm) => void;
}

export const TablaDetalleFactura = ({ data, onEliminar }: TablaDetalleFacturaProps) => {
  return (
    <>
    <TableBase
          cabeceras={{
            'N°': true,
            'CÓDIGO': true,
            'NOMBRE': true,
            'PRECIO': true,
            'CANTIDAD': true,
            'SUBTOTAL': true,
            'ACCIÓN': true,
          }}
          isLoading={false}
          hasPagination={true}
          itemsPerPage={10}
          totalItems={data.length}
        >
          {
            (attribute, cabeceras, indexOfFirstItem, indexOfLastItem) => (<>
              {
                data.map((it, index) => (
                  <tr key={index}>
                    <ColumnBase {...attribute('N°')}>{index + 1}</ColumnBase>
                    <ColumnBase {...attribute('CÓDIGO')}>{it.codigoProducto}</ColumnBase>
                    <ColumnBase {...attribute('NOMBRE')}>{it.nombreProducto}</ColumnBase>
                    <ColumnBase {...attribute('PRECIO')}>{it.precio}</ColumnBase>
                    <ColumnBase {...attribute('CANTIDAD')}>{it.cantidad}</ColumnBase>
                    <ColumnBase {...attribute('SUBTOTAL')}>{(it.cantidad * it.precio).toFixed(2)}</ColumnBase>
                    <ColumnBase {...attribute('ACCIÓN')}>
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
                            onEliminar(it)
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
        <div className='w-full mt-4 flex flex-col items-end'>
          <div className='form-group w-1/4'>
              <label className='label text-sm mb-2 tracking-wider' htmlFor="floatingInput">Sub Total</label>
              <input
                type="text"
                className='p-2 text-sm border-2 border-violet-500 rounded-md'
                id="floatingInput"
                autoComplete="off"
                readOnly
                value={calcularSubTotal(data.map(it => ({
                  codigoProducto: '',
                  facturaId: 0,
                  cantidad: 0,
                  id: 0,
                  nombreProducto: '',
                  precio: 0,
                  subTotal: it.cantidad * it.precio
                }))).toFixed(2)}
              />
          </div>
          <div className='form-group w-1/4'>
              <label className='label text-sm mb-2 tracking-wider' htmlFor="floatingInput">IGV</label>
              <input
                type="text"
                className='p-2 text-sm border-2 border-violet-500 rounded-md'
                id="floatingInput"
                autoComplete="off"
                readOnly
                value={calcularIgv(data.map(it => ({
                  codigoProducto: '',
                  facturaId: 0,
                  cantidad: 0,
                  id: 0,
                  nombreProducto: '',
                  precio: 0,
                  subTotal: it.cantidad * it.precio
                })), 0.18).toFixed(2)}
              />
          </div>
          <div className='form-group w-1/4'>
              <label className='label text-sm mb-2 tracking-wider' htmlFor="floatingInput">Total</label>
              <input
                type="text"
                className='p-2 text-sm border-2 border-violet-500 rounded-md'
                id="floatingInput"
                autoComplete="off"
                readOnly
                value={calcularTotal(data.map(it => ({
                  codigoProducto: '',
                  facturaId: 0,
                  cantidad: 0,
                  id: 0,
                  nombreProducto: '',
                  precio: 0,
                  subTotal: it.cantidad * it.precio
                }))).toFixed(2)}
              />
          </div>
        </div>
      </>
  )
}
