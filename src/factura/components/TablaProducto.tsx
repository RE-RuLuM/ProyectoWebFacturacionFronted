import { ProductoDTO } from '../../infraestructure'
import { ColumnBase, TableBase } from '../../ui/components'

interface TablaProductoProps {
  isPending: boolean,
  data: ProductoDTO[] | undefined,
  onClickRow: (it: ProductoDTO) => void
}

export const TablaProducto = ({ isPending, data, onClickRow }: TablaProductoProps) => {
  return (
    <TableBase
          cabeceras={{
            'N°': true,
            'CÓDIGO': true,
            'NOMBRE': true,
            'STOCK': true,
            'PRECIO': true,
          }}
          isLoading={isPending}
          hasPagination={true}
          itemsPerPage={10}
          totalItems={data?.length}
        >
          {
            (attribute, cabeceras, indexOfFirstItem, indexOfLastItem) => (<>
              {
                data?.map((it, index) => (
                  <tr key={it.id} className='cursor-pointer' onClick={() => {
                    onClickRow(it)
                  }}>
                    <ColumnBase {...attribute('N°')}>{index + 1}</ColumnBase>
                    <ColumnBase {...attribute('CÓDIGO')}>{it.codigo}</ColumnBase>
                    <ColumnBase {...attribute('NOMBRE')}>{it.nombre}</ColumnBase>
                    <ColumnBase {...attribute('STOCK')}>{it.stock}</ColumnBase>
                    <ColumnBase {...attribute('PRECIO')}>{it.precio}</ColumnBase>
                  </tr>
                )).slice(indexOfFirstItem, indexOfLastItem)
              }
            </>)
          }
        </TableBase>
  )
}
