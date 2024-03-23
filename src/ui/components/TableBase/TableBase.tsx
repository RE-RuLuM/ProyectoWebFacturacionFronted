import React from 'react'
import ClimbingBoxLoader from 'react-spinners/ClimbingBoxLoader'
import { Pagination } from '../Pagination'
import css from './TableBase.module.css'

interface Cabecera {
  [key: string]: boolean
}

interface TableBaseProps {
  cabeceras: Cabecera
  children: (
    attribute: (key: string) => { 'data-label': string, show: boolean },
    cabeceras: Cabecera,
    indexOfFirstItem: number,
    indexOfLastItem: number
  ) => JSX.Element
  isLoading: boolean
  hasPagination: boolean
  itemsPerPage?: number
  totalItems?: number
}

export const TableBase: React.FC<TableBaseProps> = ( props ) => {
  const { cabeceras, children, isLoading, hasPagination } = props

  //Adicionando paginacion
  const [currentPage, setCurrentPage] = React.useState(1)
  const [itemsPerPage] = React.useState(props.itemsPerPage as number)

  let indexOfLastItem = currentPage * itemsPerPage
  let indexOfFirstItem = indexOfLastItem - itemsPerPage

  const attributes = (key: keyof Cabecera) => {
    return {
      'data-label': key as string,
      show: cabeceras[key]
    }
  }

  return (<>
    <table className={`${css.table}`}>
      <thead>
        <tr>
          { Object.keys(cabeceras).map((key, index) => !!cabeceras[key] && 
            (
              <th key={index}>{key}</th>)
          )}
        </tr>
      </thead>
      <tbody>
        {
          isLoading ?
          <tr>
            <td className='h-50' colSpan={Object.keys(cabeceras).length}>
              <div className='w-100 d-flex justify-content-center'>
                <ClimbingBoxLoader />
              </div>
            </td>
          </tr>
          :
          children(attributes, cabeceras, indexOfFirstItem, indexOfLastItem)
        }
      </tbody>
    </table>
    {
      hasPagination
      &&
      <Pagination 
        itemsPerPage={itemsPerPage} 
        totalItems={props.totalItems as number}
        paginate={pageNumber => {setCurrentPage(pageNumber)}}
      />
    }
  </>)
}

TableBase.defaultProps = {
  itemsPerPage: 5,
  totalItems: 0
}
