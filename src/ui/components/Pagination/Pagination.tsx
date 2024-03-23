import React from 'react'

interface PaginationProps {
  itemsPerPage: number;
  totalItems: number;
  paginate: (page: number) => void
}

export const Pagination: React.FC<PaginationProps> = (props) => {
  const { itemsPerPage, totalItems, paginate } = props

  const pageNumbers = []

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i)
  }

  const [active, setActive] = React.useState(1)

  return (
    <nav>
      <ul style={{ listStyle: 'none', display: 'flex'}}>
        {pageNumbers.map(number => (
          <li key={number} style={{ border: '1px solid #0d6efd', padding: '5px 10px', borderRadius: 3 }}>
            <a 
              href="!#" 
              onClick={(e) => {
                e.preventDefault()
                setActive(number)
                paginate(number)
              }} 
              className={`mt-2 page-link ${active == number && 'active'}`}>
                {number}
              </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
