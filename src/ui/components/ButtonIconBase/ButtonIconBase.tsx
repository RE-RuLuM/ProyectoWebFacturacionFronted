import React from 'react';
import classNames from 'classnames';

import EditIcon from '../../../assets/edit.svg?react';
import TrashIcon from '../../../assets/trash.svg?react';
import styles from './ButtonIconBase.module.css'

type Accion = 'editar' | 'ver' | 'eliminar' | 'archivar';

interface ButtonIconProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  accion: Accion;
  texto?: string | null;
}

export const ButtonIconBase: React.FC<ButtonIconProps> = (props) => {
  const { accion, ...rest } = props;

  const Icon = () =>
    accion === 'editar'
      ? <EditIcon className={`${styles['edit-icon']}`} />
      : <TrashIcon className={`${styles['trash-icon']}`} />

  return <>
    <button
      className={classNames( styles['button-base'], styles.btn , {
        'btn--editar': accion === 'editar',
        'btn--eliminar': accion === 'eliminar',
      })}
      type='button'
      style={{
        height: 40
      }}
      {...rest}
    >
      <Icon />
      {/* <IconButton src={<Icon />} alt={accion} style={{ marginRight: (props.texto) ? 10 : 0 }} /> */}
        {props.texto}
    </button>
  </>;
};
