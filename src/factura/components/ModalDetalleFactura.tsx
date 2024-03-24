import { TablaDetalleFacturaVista } from '.';
import { FacturaDTO } from '../../infraestructure';
import { ModalBase } from '../../ui/components'

interface ModalDetalleFacturaProps {
  isActive: boolean;
  factura: FacturaDTO | undefined;
  onCloseModal: () => void;
}

export const ModalDetalleFactura = ({ isActive, onCloseModal, factura }: ModalDetalleFacturaProps) => {
  return (
    <>
      <ModalBase
        isActive={isActive}
        classes='w-1/2'
      >
        <>
        <div className='footer flex gap-4 justify-end mt-4'>
          <button className='btn w-1/4 bg-red-500' style={{ padding: '10px 2px'}} onClick={onCloseModal} type='button'>CERRAR</button>
        </div>
        <div className='form-group w-1/2 mb-4'>
            <label className='label text-sm mb-2 tracking-wider' htmlFor="floatingInput">Código Factura</label>
            <input
              type="text"
              className='p-2 text-sm border-2 border-violet-500 rounded-md'
              id="floatingInput"
              autoComplete="off"
              value={factura?.numeroFactura ?? ''}
              readOnly
            />
        </div>
          <fieldset className='border border-violet-500 rounded-lg pl-5 mb-5'>
            <legend className='text-violet-500 font-bold text-lg px-4'>CLIENTE</legend>
            <div className='px-5 py-7'>
              <div className='flex flex-nowrap items-end gap-4 mb-2'>
                <div className='form-group w-1/2'>
                    <label className='label text-sm mb-2 tracking-wider' htmlFor="floatingInput">Razón social / Nombre Completo</label>
                    <input
                      type="text"
                      className='p-2 text-sm border-2 border-violet-500 rounded-md'
                      id="floatingInput"
                      autoComplete="off"
                      value={factura?.cliente.nombres ?? ''}
                      readOnly
                    />
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
                      value={factura?.cliente.correo ?? ''}
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
                      value={factura?.cliente.rucDni ?? ''}
                      readOnly
                    />
                </div>
              </div>
            </div>
          </fieldset>
          <TablaDetalleFacturaVista
            data={factura?.detalles || []}
          />
        </>
      </ModalBase>
    </>
  )
}
