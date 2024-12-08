import { VscodeDocumentIcon } from '@/components/icons/VsCodeDocumentIcon'
import {
  PageFileTypeSelector,
  PageViewTypeOptions,
} from '@/components/page/common/PageViewTypeDropdown'
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Selection } from '@nextui-org/react'
import { ButtonGroup, Button } from '@nextui-org/react'
import {
  RiFilterFill,
  RiCloseLine,
  RiCalendarLine,
  RiArrowDownSLine,
  RiAddLine,
  RiFolder3Line,
  RiUpload2Fill,
  RiTableLine,
  RiListCheck,
} from 'react-icons/ri'

interface Props {
  typeFilter: Selection
  onTypeFilterChange: (type: Selection) => void
  onCreateFolderClick: () => void
  onUploadClick: () => void
  onCreateDocumentClick?: () => void
}

export const FolderViewToolbar = (props: Props) => {
  const {
    typeFilter,
    onTypeFilterChange,
    onCreateFolderClick,
    onUploadClick,
    onCreateDocumentClick,
  } = props
  return (
    <div className="mt-4 flex flex-col-reverse justify-between gap-y-4 md:flex-row">
      <div className="flex items-center gap-3">
        <ButtonGroup>
          <PageFileTypeSelector
            selectedKeys={typeFilter}
            onSelectionChange={onTypeFilterChange}
            selectionMode="single"
          >
            <Button
              size="sm"
              startContent={
                typeFilter !== 'all' ? (
                  PageViewTypeOptions.find((option) => typeFilter.has(option.value))?.icon
                ) : (
                  <RiFilterFill size={16} />
                )
              }
            >
              {typeFilter === 'all'
                ? 'Type'
                : PageViewTypeOptions.find((option) => typeFilter.has(option.value))?.label}
            </Button>
          </PageFileTypeSelector>
          {typeFilter !== 'all' && (
            <Button
              size="sm"
              isIconOnly
              variant="flat"
              onClick={() => {
                onTypeFilterChange('all')
              }}
            >
              <RiCloseLine size={16} />
            </Button>
          )}
        </ButtonGroup>
        <Button
          startContent={<RiCalendarLine size={16} />}
          size="sm"
          endContent={<RiArrowDownSLine size={16} />}
        >
          Modified
        </Button>
      </div>
      <div className="flex items-center gap-3">
        <Dropdown>
          <DropdownTrigger>
            <Button
              size="sm"
              startContent={<RiAddLine size={14} />}
              endContent={<RiArrowDownSLine size={16} />}
            >
              Create
            </Button>
          </DropdownTrigger>
          <DropdownMenu onAction={(key) => {
            if (key === 'folder') {
              onCreateFolderClick()
            } else if (key === 'document') {
              onCreateDocumentClick?.()
            }
          }}>
            <DropdownItem
              key="folder"
              startContent={<RiFolder3Line size={16} className="text-success" />}
            >
              New Folder
            </DropdownItem>
            <DropdownItem
              key="document"
              startContent={<VscodeDocumentIcon width={16} height={16} />}
            >
              New Document
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Button size="sm" startContent={<RiUpload2Fill size={14} />} onClick={onUploadClick}>
          Upload
        </Button>
        <ButtonGroup>
          <Button isIconOnly size="sm">
            <RiTableLine size={16} />
          </Button>
          <Button isIconOnly size="sm" color="primary">
            <RiListCheck size={16} />
          </Button>
        </ButtonGroup>
      </div>
    </div>
  )
}
