import { cn } from '@/libs/utils'
import { PageRole, PageRoleEnum } from '@/schema/page'
import { Button, ListboxItem, Select, SelectItem, Skeleton } from '@nextui-org/react'
import { PropsWithChildren, useMemo } from 'react'

interface PageRolesMenuProps {
  open?: boolean
  onClose?: () => void
  value?: PageRole
  onChange?: (role: PageRole) => void
  disabled?: boolean
  className?: string
  size?: 'sm' | 'md' | 'lg'
  extraButtons?: {
    label: string
    onClick?: () => void
    startContent?: React.ReactNode
    endContent?: React.ReactNode
    description?: string
    bottomDivider?: boolean
  }[]
}

const Options = [
  {
    label: 'Editor',
    value: PageRoleEnum.EDITOR,
  },
  {
    label: 'Viewer',
    value: PageRoleEnum.VIEWER,
  },
]

export const PageRolesMenu = (props: PropsWithChildren<PageRolesMenuProps>) => {
  const { value, disabled = false, className, onChange, size = 'sm', extraButtons } = props
  const selectedOption = useMemo(() => Options.find((option) => option.value === value), [value])
  const isLoading = !selectedOption

  if (value === undefined || isLoading)
    return (
      <Button size={size} disabled>
        <Skeleton className="h-[14px] w-[40px] rounded-medium" />
      </Button>
    )

  return (
    <Select
      size={size}
      className={cn('max-w-[90px]', className)}
      selectionMode="single"
      selectedKeys={[String(selectedOption.value)]}
      disallowEmptySelection
      onSelectionChange={(values) => {
        // type cast
        const newValue = Number(Array.from(values)[0]) as PageRole
        if (!(Object.values(PageRoleEnum).includes(newValue))) {
          extraButtons?.find((button) => button.label === Array.from(values)[0])?.onClick?.()
          return
        } 

        if (value === newValue) return
        onChange?.(newValue)
      }}
      isDisabled={disabled}
      classNames={{
        popoverContent: '!max-w-[200px] w-fit',
      }}
    >
      {[
        ...Options.map((option, i) => (
          <SelectItem
            key={String(option.value)}
            value={String(option.value)}
            showDivider={Boolean(extraButtons?.length && i === Options.length - 1)}
          >
            {option.label}
          </SelectItem>
        )),
        ...(extraButtons || []).map((button) => (
          <ListboxItem
            key={button.label}
            startContent={button.startContent}
            endContent={button.endContent}
            description={button.description}
            showDivider={button.bottomDivider}
          >
            {button.label}
          </ListboxItem>
        ))
      ]}
    </Select>
  )
}
