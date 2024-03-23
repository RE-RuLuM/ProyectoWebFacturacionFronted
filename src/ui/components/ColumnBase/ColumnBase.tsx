import React from 'react'

interface ColumnBaseProps {
  'data-label': string;
  show: boolean;
  children: any
}

export const ColumnBase: React.FC<ColumnBaseProps> = (props) => {
  return (<>
    {props.show && <td data-label={props['data-label']} ><span>{props.children}</span></td>}
  </>)
}
