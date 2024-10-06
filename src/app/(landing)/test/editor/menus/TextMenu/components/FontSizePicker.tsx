import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react'
import { useCallback } from 'react'
import { RiArrowDownSLine } from 'react-icons/ri'

const FONT_SIZES = [
  { label: 'Smaller', value: '12px' },
  { label: 'Small', value: '14px' },
  { label: 'Medium', value: '' },
  { label: 'Large', value: '18px' },
  { label: 'Extra Large', value: '24px' },
]

export type FontSizePickerProps = {
  onChange: (value: string) => void // eslint-disable-line no-unused-vars
  value: string
}

export const FontSizePicker = ({ onChange, value }: FontSizePickerProps) => {
  const currentValue = FONT_SIZES.find((size) => size.value === value)
  const currentSizeLabel = currentValue?.label.split(' ')[0] || 'Medium'

  const selectSize = useCallback((size: string) => () => onChange(size), [onChange])

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
        // active={!!currentValue?.value}
        >
          {currentSizeLabel}
          <RiArrowDownSLine size={16} />
        </Button>
      </DropdownTrigger>
      <DropdownMenu>
        {FONT_SIZES.map((size) => (
          <DropdownItem
            // isActive={value === size.value}
            onClick={selectSize(size.value)}
            key={`${size.label}_${size.value}`}
          >
            <span style={{ fontSize: size.value }}>{size.label}</span>
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  )
}
