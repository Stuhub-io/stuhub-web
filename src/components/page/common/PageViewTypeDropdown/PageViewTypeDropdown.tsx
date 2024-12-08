import { VscodeAudioIcon } from '@/components/icons/VsCodeAudioIcon'
import { VscodeDocumentIcon } from '@/components/icons/VsCodeDocumentIcon'
import { VscodeImageIcon } from '@/components/icons/VsCodeImageIcon'
import { VscodePdfIcon } from '@/components/icons/VsCodePdfIcon'
import { VscodeVideoIcon } from '@/components/icons/VsCodeVideoIcon'
import { IPageFileTypeLabels } from '@/utils/page'
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  type DropdownMenuProps,
  DropdownTrigger,
} from '@nextui-org/react'
import { PropsWithChildren } from 'react'
import { RiFolder3Fill } from 'react-icons/ri'

interface PageViewTypeDropdownProps extends DropdownMenuProps {}

export const PageViewTypeOptions = [
  {
    icon: <RiFolder3Fill className="text-success" size={20} />,
    label: IPageFileTypeLabels.FOLDER,
    value: IPageFileTypeLabels.FOLDER,
  },
  {
    icon: <VscodeDocumentIcon width={20} height={20} />,
    label: IPageFileTypeLabels.DOCUMENT,
    value: IPageFileTypeLabels.DOCUMENT,
  },
  {
    icon: <VscodePdfIcon width={20} height={20} />,
    label: IPageFileTypeLabels.PDF,
    value: IPageFileTypeLabels.PDF,
  },
  {
    icon: <VscodeImageIcon width={20} height={20} />,
    label: IPageFileTypeLabels.IMAGE,
    value: IPageFileTypeLabels.IMAGE,
  },
  {
    icon: <VscodeVideoIcon width={20} height={20} />,
    label: IPageFileTypeLabels.VIDEO,
    value: IPageFileTypeLabels.VIDEO,
  },
  {
    icon: <VscodeAudioIcon width={20} height={20} />,
    label: IPageFileTypeLabels.AUDIO,
    value: IPageFileTypeLabels.AUDIO,
  },
] as const

export const PageFileTypeSelector = (props: PropsWithChildren<PageViewTypeDropdownProps>) => {
  const { children, ...rest } = props
  return (
    <Dropdown>
      <DropdownTrigger>{children}</DropdownTrigger>
      <DropdownMenu
        disallowEmptySelection
        aria-label="Table Columns"
        {...rest}
      >
        {PageViewTypeOptions.map((option) => {
          return (
            <DropdownItem key={option.value} startContent={option.icon}>
              {option.label}
            </DropdownItem>
          )
        })}
      </DropdownMenu>
    </Dropdown>
  )
}
