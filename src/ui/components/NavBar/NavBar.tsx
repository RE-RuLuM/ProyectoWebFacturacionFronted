import { useNavigate } from 'react-router-dom';

import css from './navbar.module.css'
import Icon from '../../../assets/Icon.svg'
import Arrow from '../../../assets/Arrow.svg'

export const NavBar = () => {
  const navigate = useNavigate();

  const toggleDropdown = (e: React.SyntheticEvent<HTMLDivElement>) => {
    const element$ = e.target as HTMLDivElement
    const dropdownContent$ = element$.parentElement?.querySelector(`.${css['dropdown__content']}`)
    element$.classList.toggle(css['dropdown__text--active'])
    dropdownContent$?.classList.toggle(css['dropdown__content--active'])
  }

  const selectDropdownLink = (e: React.SyntheticEvent<HTMLLIElement>) => {
    const element$ = e.target as HTMLLIElement
    const dropdownLinks$ = document.querySelectorAll(`.${css['dropdown__link']}`)
    dropdownLinks$?.forEach(it => it.classList.remove(css['dropdown__link--active']))
    element$.classList.add(css['dropdown__link--active'])
  }

  return (
    <>
      <nav className={`${css['navbar']} relative`}>
        <div className={css['navbar__title']}>
          <img className={css['navbar__logo']} src={Icon} alt="" />
          <div className={css['navbar__text']}>
            Control
            <br />
            Ventas
          </div>
        </div>
        <ul className={css.ul}>
          <li className={css['dropdown']}>
            <div className={css['dropdown__text']} onClick={toggleDropdown}>
              <span className={css['dropdown__text__span']}>CATÁLOGOS</span>
              <img className={css['arrow']} alt="arrow" src={Arrow} />
            </div>
            <ul className={`${css.ul} ${css['dropdown__content']}`}>
              <div style={ {overflow: 'hidden' } }>
                <li className={css['dropdown__link']} onClick={(e) => {
                    selectDropdownLink(e)
                    navigate('/productos', {
                      replace: true,
                    })
                  }}>
                  PRODUCTO
                </li>
                <li className={css['dropdown__link']} onClick={(e) => {
                    selectDropdownLink(e)
                    navigate('/clientes', {
                      replace: true,
                    })
                  }}>
                  CLIENTES
                </li>
              </div>
            </ul>
          </li>
          <li className={css['dropdown']}>
            <div className={css['dropdown__text']} onClick={toggleDropdown}>
              <span className={css['dropdown__text__span']}>DOCUMENTOS</span>
              <img className={css['arrow']} alt="arrow" src={Arrow} />
            </div>
            <ul className={`${css.ul} ${css['dropdown__content']}`}>
              <div style={ {overflow: 'hidden' } }>
                <li className={css['dropdown__link']} onClick={(e) => {
                    selectDropdownLink(e)
                    navigate('/facturas/emision', {
                      replace: true,
                    })
                  }}>
                  EMISIÓN FACTURA
                </li>
                <li className={css['dropdown__link']} onClick={(e) => {
                    selectDropdownLink(e)
                    navigate('/facturas', {
                      replace: true,
                    })
                  }}>
                  FACTURAS EMITIDAS
                </li>
              </div>
            </ul>
          </li>
        </ul>
        <button
            className='w-4/5 left-5 bg-violet-600 text-white font-bold rounded-xl px-3 py-2 h-fit tracking-wider absolute bottom-5'
            onClick={() => {
              localStorage.clear()
              navigate('/login', {
                replace: true
              })
            }}
            type="button">
            SALIR
          </button>
      </nav>
    </>
  )
}
