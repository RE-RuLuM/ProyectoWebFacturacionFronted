import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { ButtonIconBase, ColumnBase, ModalBase, TableBase } from '../../ui/components'
import { FacturaDTO, facturaService } from '../../infraestructure'
import { ModalDetalleFactura } from '../components'
import { calcularIgv, calcularSubTotal, calcularTotal } from '../../utils'
import Swal from 'sweetalert2'

export const ListadoFacturas = () => {
  const [facturaId, setFacturaId] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const queryClient = useQueryClient()
  const { data, isPending } = useQuery({ queryKey: ['facturas'], queryFn: () => facturaService.listarFacturas() })
  const {data: dataFactura} = useQuery({
    queryKey: ['factura', facturaId], 
    queryFn: () => facturaService.obtenerFacturaPorId(facturaId), 
    enabled: !!facturaId,
  })

  const mutationDelete = useMutation({
    mutationFn: facturaService.eliminarFactura,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['facturas'] })
    }
  })

  useEffect(() => {
    return () => {
      queryClient.cancelQueries({ queryKey: ['facturas'] })
    }
  }, [])

  return (<>
      <ModalDetalleFactura
        isActive={isModalOpen}
        factura={dataFactura?.data}
        onCloseModal={() => {
          setIsModalOpen(false)
        }}
      />
      <div className='w-3/4'>
        <TableBase
          cabeceras={{
            'N°': true,
            'NÚMERO FACTURA': true,
            'NOMBRE CLIENTE': true,
            'SUBTOTAL': true,
            'IGV': true,
            'TOTAL': true,
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
                    <ColumnBase {...attribute('NÚMERO FACTURA')}>{it.numeroFactura}</ColumnBase>
                    <ColumnBase {...attribute('NOMBRE CLIENTE')}>{it.cliente.nombres}</ColumnBase>
                    <ColumnBase {...attribute('SUBTOTAL')}>{calcularSubTotal(it.detalles).toFixed(2)}</ColumnBase>
                    <ColumnBase {...attribute('IGV')}>{calcularIgv(it.detalles, 0.18).toFixed(2)}</ColumnBase>
                    <ColumnBase {...attribute('TOTAL')}>{calcularTotal(it.detalles).toFixed(2)}</ColumnBase>
                    <ColumnBase {...attribute('ACCIÓN')}>
                      <ButtonIconBase
                        accion="ver"
                        onClick={() => {
                          setFacturaId(it.id)
                          setIsModalOpen(true)
                        }}
                      />
                      <ButtonIconBase
                        accion="eliminar"
                        onClick={async () => {
                          const result = await Swal.fire({
                            title: "¿Deseas eliminar este registro?",
                            showDenyButton: true,
                            confirmButtonText: "ELIMINAR",
                            denyButtonText: `CANCELAR`
                          })

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
