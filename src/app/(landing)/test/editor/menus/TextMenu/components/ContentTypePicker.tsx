import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react'
import { ReactNode } from 'react'
import { RiArrowDownSLine } from 'react-icons/ri'

export type ContentTypePickerOption = {
  label: string
  id: string
  type: 'option'
  disabled: () => boolean
  isActive: () => boolean
  onClick: () => void
  icon: ReactNode
}

export type ContentTypePickerCategory = {
  label: string
  id: string
  type: 'category'
}

export type ContentPickerOptions = (ContentTypePickerOption | ContentTypePickerCategory)[]

export type ContentTypePickerProps = {
  options: ContentPickerOptions
}

const isOption = (
  option: ContentTypePickerOption | ContentTypePickerCategory,
): option is ContentTypePickerOption => option.type === 'option'

// const isCategory = (
//   option: ContentTypePickerOption | ContentTypePickerCategory,
// ): option is ContentTypePickerCategory => option.type === 'category'

export const ContentTypePicker = ({ options }: ContentTypePickerProps) => {
  // const activeItem = useMemo(
  //   () => options.find((option) => option.type === 'option' && option.isActive()),
  //   [options],
  // )

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button 
        // active={activeItem?.id !== 'paragraph' && !!activeItem?.type}
        >
          {/* <Icon name={(activeItem?.type === 'option' && activeItem.icon) || 'Pilcrow'} /> */}
          <RiArrowDownSLine size={16} />
        </Button>
      </DropdownTrigger>
      <DropdownMenu>
        {options.map((option) => {
          if (isOption(option)) {
            return (
              <DropdownItem key={option.id} onClick={option.onClick} startContent={option.icon}>
                {option.label}
              </DropdownItem>
            )
          }
          return <DropdownItem key={option.id}>{option.label}</DropdownItem>
        })}
      </DropdownMenu>
    </Dropdown>
  )
}
