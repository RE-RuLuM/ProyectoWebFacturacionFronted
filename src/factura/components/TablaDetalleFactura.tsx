import Swal from 'sweetalert2';
import { ButtonIconBase, ColumnBase, TableBase } from '../../ui/components'
import { DetalleFacturaForm } from '../../utils'

interface TablaDetalleFacturaProps {
  data: DetalleFacturaForm[],
  onEliminar: (item: DetalleFacturaForm) => void;
}

export const TablaDetalleFactura = ({ data, onEliminar }: TablaDetalleFacturaProps) => {
  return (
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
                    <ColumnBase {...attribute('SUBTOTAL')}>{it.cantidad * it.precio}</ColumnBase>
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
  )
}
