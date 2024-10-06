import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from '@nextui-org/react'
import { useCallback } from 'react'
import { RiArrowDownSLine } from 'react-icons/ri'

const FONT_FAMILY_GROUPS = [
  {
    label: 'Sans Serif',
    options: [
      { label: 'Inter', value: '' },
      { label: 'Arial', value: 'Arial' },
      { label: 'Helvetica', value: 'Helvetica' },
    ],
  },
  {
    label: 'Serif',
    options: [
      { label: 'Times New Roman', value: 'Times' },
      { label: 'Garamond', value: 'Garamond' },
      { label: 'Georgia', value: 'Georgia' },
    ],
  },
  {
    label: 'Monospace',
    options: [
      { label: 'Courier', value: 'Courier' },
      { label: 'Courier New', value: 'Courier New' },
    ],
  },
]

const FONT_FAMILIES = FONT_FAMILY_GROUPS.flatMap((group) => [group.options]).flat()

export type FontFamilyPickerProps = {
  onChange: (value: string) => void // eslint-disable-line no-unused-vars
  value: string
}

export const FontFamilyPicker = ({ onChange, value }: FontFamilyPickerProps) => {
  const currentValue = FONT_FAMILIES.find((size) => size.value === value)
  const currentFontLabel = currentValue?.label.split(' ')[0] || 'Inter'

  const selectFont = useCallback((font: string) => () => onChange(font), [onChange])

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
        // active={!!currentValue?.value}
        >
          {currentFontLabel}
          <RiArrowDownSLine size={16} />
        </Button>
      </DropdownTrigger>
      <DropdownMenu>
        {FONT_FAMILY_GROUPS.map((group) => (
          <DropdownSection key={group.label} title={group.label}>
            {group.options.map((font) => (
              <DropdownItem
                // isActive={value === font.value}
                onClick={selectFont(font.value)}
                key={`${font.label}_${font.value}`}
              >
                <span style={{ fontFamily: font.value }}>{font.label}</span>
              </DropdownItem>
            ))}
          </DropdownSection>
        ))}
      </DropdownMenu>
    </Dropdown>
  )
}
