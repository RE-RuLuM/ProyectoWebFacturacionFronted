import classNames from 'classnames'
import React, { useEffect, useState } from 'react'

interface ModalBaseProps {
  children: React.JSX.Element
  isActive: boolean
}

export const ModalBase = ({ children, isActive }: ModalBaseProps) => {
  return (
    <div className={classNames('w-1/3 absolute bg-white z-10 p-4 border-2 border-blue-800 rounded-md animate__animated ', { 
      'animate__fadeInDown': isActive,
      'hidden': !isActive
      // 'animate__fadeOutUp': !isActive,
      })}>
      {children}
    </div>
  )
}