import classNames from 'classnames'
import { useState } from 'react'

interface Props {
  label: string
  buttonStyle?: string
  iconStyle?: string
  items: string[]
  // isActive: boolean
  isLoading: boolean
  isDisabled: boolean
  // onButtonClick: () => void
  // onItemClick: (arg0: string) => void
}

const Dropdown = ({
  label,
  buttonStyle = '',
  iconStyle,
  items,
  // isActive,
  isLoading,
  isDisabled
}: // onButtonClick,
// onItemClick,
Props) => {
  const [selectedItem, setSelectedItem] = useState('')
  const [isActive, setIsActive] = useState(false)

  const dropdownClass = classNames('dropdown', { 'is-active': isActive })
  const buttonClass = classNames('button', buttonStyle, {
    'is-loading': isLoading
  })
  const iconClass = classNames('fas', iconStyle)

  const onItemClick = (r: string) => {
    setIsActive(!isActive)
    setSelectedItem(r)
  }

  return (
    <div className={dropdownClass}>
      <div className="dropdown-trigger">
        <button
          type="button"
          className={buttonClass}
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsActive(!isActive)}
          disabled={isDisabled}>
          <span>{selectedItem || label}</span>
          <span className="icon is-small">
            <i className={iconClass} aria-hidden="true" />
          </span>
        </button>
      </div>
      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {items &&
            items.map((item) => (
              <div
                key={item}
                className="dropdown-item"
                onClick={() => {
                  onItemClick(item)
                }}
                onKeyPress={() => onItemClick(item)}
                role="button"
                tabIndex={0}>
                {item}
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default Dropdown
