import classNames from 'classnames'
import React from 'react'

interface ModalBaseProps {
  children: React.JSX.Element
  isActive: boolean,
  classes?: string,
}

export const ModalBase = ({ children, isActive, classes }: ModalBaseProps) => {
  return (
    <div className={classNames(`${classes} absolute bg-white z-10 p-4 border-2 border-blue-800 rounded-md animate__animated`, { 
      'animate__fadeInDown': isActive,
      'hidden': !isActive
      // 'animate__fadeOutUp': !isActive,
      })}>
      {children}
    </div>
  )
}