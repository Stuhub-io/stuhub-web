import { useSidebar } from '@/components/providers/sidebar'
import { PageViewTypeEnum } from '@/schema/page'
import { Autocomplete, AutocompleteItem } from '@nextui-org/react'
import { Key, useMemo, useState } from 'react'
import { RiFolder3Fill } from 'react-icons/ri'

interface FolderSelectorProps {
  selectedFolderPkId?: number
  onFolderPkIdChanged?: (folderPkId: number | null) => void
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export const FolderSelector = (props: FolderSelectorProps) => {
  const { selectedFolderPkId, onFolderPkIdChanged, className, size = 'sm' } = props
  const { orgPages } = useSidebar()
  const [value, setValue] = useState('')

  const folders = useMemo(() => {
    return orgPages?.list.filter((page) => page.view_type === PageViewTypeEnum.FOLDER) ?? []
  }, [orgPages])

  const onSelectionChange = (key: Key | null) => {
    if (key === null) {
      setValue('')
      onFolderPkIdChanged?.(null)
      return
    }
    setValue(orgPages?.map[key as number]?.page.name || 'Untitled')
    onFolderPkIdChanged?.(key as number | null)
  }

  return (
    <Autocomplete
      startContent={<RiFolder3Fill size={24} className="text-success" />}
      selectedKey={selectedFolderPkId}
      inputValue={value}
      onInputChange={setValue}
      items={folders}
      onSelectionChange={onSelectionChange}
      autoFocus={false}
      className={className}
      clearButtonProps={{
        onClick: () => {
          onFolderPkIdChanged?.(null)
          setValue('')
        },
      }}
      size={size}
      placeholder="Upload to root"
      isRequired
    >
      {(folder) => (
        <AutocompleteItem
          key={folder.pkid}
          classNames={{
            title: 'w-full',
          }}
          description={`in ${folder.parent_page_pkid ? 'root' : orgPages?.map[folder.parent_page_pkid!]?.page.name || 'Untitled'}`}
        >
          {folder.name || 'Untitled'}
        </AutocompleteItem>
      )}
    </Autocomplete>
  )
}
