import classnames from 'classnames'
import React, { useState } from 'react'

interface Props {
  children?: React.ReactNode
  message?: string
  type: string
  duration?: number
}

export default function Alert({
  children,
  type,
  message,
  duration = 3000
}: Props) {
  const [isShow, setIsShow] = useState(true)

  if (isShow) {
    setTimeout(() => {
      setIsShow(false)
    }, duration)
  }

  return (
    <div
      className={classnames('alert', type, {
        hide: !isShow,
        active: isShow,
        out: !isShow
      })}>
      <span className="closebtn" onClick={() => setIsShow(false)}>
        &times;
      </span>
      {children ? children : message}
    </div>
  )
}
