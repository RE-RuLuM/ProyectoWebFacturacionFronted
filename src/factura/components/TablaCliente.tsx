import { ClienteDTO } from '../../infraestructure'
import { ColumnBase, TableBase } from '../../ui/components'

interface TablaClienteProps {
  isPending: boolean,
  data: ClienteDTO[] | undefined,
  onClickRow: (it: ClienteDTO) => void
}

export const TablaCliente = ({ isPending, data, onClickRow }: TablaClienteProps) => {
  return (
    <TableBase
          cabeceras={{
            'N°': true,
            'DOCUMENTO': true,
            'NOMBRE': true,
            'DIRECCIÓN': true,
            'CORREO': true,
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
                    <ColumnBase {...attribute('DOCUMENTO')}>{it.rucDni}</ColumnBase>
                    <ColumnBase {...attribute('NOMBRE')}>{it.nombres}</ColumnBase>
                    <ColumnBase {...attribute('DIRECCIÓN')}>{it.direccion}</ColumnBase>
                    <ColumnBase {...attribute('CORREO')}>{it.correo}</ColumnBase>
                  </tr>
                )).slice(indexOfFirstItem, indexOfLastItem)
              }
            </>)
          }
        </TableBase>
  )
}
