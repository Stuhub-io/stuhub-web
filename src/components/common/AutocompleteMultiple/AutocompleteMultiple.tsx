import { cn } from '@/libs/utils'
import { Chip, Listbox, ListboxItem } from '@nextui-org/react'
import { useEffect, useMemo, useState } from 'react'
import { RiCheckLine } from 'react-icons/ri'
import { useSearchValue } from './hook'
import uniqBy from 'lodash/uniqBy'
import { useToast } from '@/hooks/useToast'

export type ACValue = {
  key: string
  label: string
}

export interface AutocompleteMultipleProps<T extends ACValue = ACValue> {
  value: T[]
  onChange: (value: T[]) => void
  className?: string
  renderTag?: (item: T, onDelete: () => void) => React.ReactNode
  disabled?: boolean
  inputValue?: string
  onInputValueChange?: (value: string) => void
  items?: T[]
  compareItem?: (item: T, search: string) => boolean
  renderItem?: (
    item: T,
    state: {
      isActive: boolean
      isSelected: boolean
    },
  ) => {
    title?: React.ReactNode
    description?: React.ReactNode
    startContent?: React.ReactNode
    endContent?: React.ReactNode
  }
  genCustomItem?: (label: string) => T // generate custom item on enter
  itemValidator?: (item: T) => string
}

export const AutocompleteMultiple = <T extends ACValue = ACValue>(
  props: AutocompleteMultipleProps<T>,
) => {
  const {
    value,
    onChange,
    className,
    renderTag,
    inputValue,
    onInputValueChange,
    items,
    disabled,
    genCustomItem = (label: string) => ({
      key: label,
      label,
    }),
    itemValidator = () => '',
    renderItem,
  } = props

  const valueKeys = useMemo(() => {
    return new Set(value.map((v) => v.key))
  }, [value])

  const { toast } = useToast()

  const [inputRef, setInputRef] = useState<HTMLInputElement | null>(null)

  const { value: search, onValueChange: setSearch } = useSearchValue(inputValue, onInputValueChange)

  const [showList, setShowList] = useState(false)
  const [willSelected, setWillSelected] = useState<number>(0)

  const handleNavigateWillSelect = (direction: 'up' | 'down') => {
    if (!items?.length) return
    setWillSelected((prev) => {
      if (direction === 'up') {
        return (prev - 1 + items.length) % items.length
      }
      return (prev + 1) % items.length
    })
  }

  const handleSearchChange = (value: string) => {
    setSearch(value)
    setWillSelected(0)
  }

  const handleNewCustomItem = (label: string) => {
    if (!label) return

    const newItem = genCustomItem(label) as T
    const errMsg = itemValidator(newItem)

    if (errMsg) {
      toast({
        variant: 'danger',
        title: 'Invalid',
        description: errMsg,
      })
      return
    }

    setSearch('')
    handleSelectItem(newItem as T)
    inputRef?.focus()
  }

  const handleSelectItem = (item: T) => {
    const errMsg = itemValidator(item)
    if (errMsg) {
      toast({
        variant: 'danger',
        title: 'Invalid',
        description: errMsg,
      })
      return
    }
    onChange(uniqBy([...value, item], 'key'))
    setSearch('')
    inputRef?.focus()
  }

  const handleDeleteItem = (deleteIdx: number) => {
    onChange(value.filter((_, i) => i !== deleteIdx))
    inputRef?.focus()
  }

  const handleBackspace = () => {
    if (search) return
    if (value.length) {
      onChange(value.filter((_, i) => i !== value.length - 1))
    }
  }

  useEffect(() => {
    const handleCloseOnClickOutside = (e: MouseEvent) => {
      if (e.target instanceof HTMLElement) {
        if (!e.target.closest('.autocomplete-wrapper')) {
          setShowList(false)
          inputRef?.blur()
        }
        e.preventDefault()
        e.stopPropagation()
        e.stopImmediatePropagation()
      }
    }
    document.addEventListener('click', handleCloseOnClickOutside)
    return () => {
      document.removeEventListener('click', handleCloseOnClickOutside)
    }
  }, [inputRef])

  const remainItems = useMemo(() => {
    return items?.filter((item) => !valueKeys.has(item.key)) ?? []
  }, [items, valueKeys])

  return (
    <div
      className={cn(
        'autocomplete-wrapper',
        'relative flex w-full cursor-text flex-wrap gap-x-1 gap-y-0.5',
        'rounded-medium bg-default-100 p-2',
        {
          'pointer-events-none opacity-50': disabled,
        },
        className,
      )}
      onClick={() => {
        inputRef?.focus()
        setShowList(true)
      }}
    >
      {value.map((item, index) => {
        return renderTag ? (
          renderTag(item, () => handleDeleteItem(index))
        ) : (
          <Chip size="md" key={item.key} onClose={() => handleDeleteItem(index)}>
            {item.label}
          </Chip>
        )
      })}
      <input
        disabled={disabled}
        className="flex-1 flex-shrink bg-transparent outline-none"
        value={search}
        onChange={(e) => handleSearchChange(e.target.value)}
        onFocus={() => setShowList(true)}
        ref={setInputRef}
        onKeyDown={(e) => {
          switch (e.key) {
            case 'Enter':
              if (remainItems?.length) {
                e.preventDefault() // prevent form submit
                handleSelectItem(remainItems[willSelected])
                return
              }
              if (search) {
                e.preventDefault() // prevent form submit
                console.log('search', search)
                handleNewCustomItem?.(search)
                return
              }
              return
            case 'Backspace':
              handleBackspace()
              return
            case 'ArrowDown':
              handleNavigateWillSelect('down')
              return
            case 'ArrowUp':
              handleNavigateWillSelect('up')
              return
            case 'Escape':
              setShowList(false)
              e.preventDefault()
              e.stopPropagation()
              return
          }
        }}
      />
      {showList && Boolean(remainItems?.length) && (
        <div className="absolute -bottom-2 left-0 right-0 z-50 w-full translate-y-full">
          <Listbox
            className={cn(
              'w-full rounded-large bg-content2 shadow-large duration-200 animate-in fade-in-0 slide-in-from-top-2',
            )}
          >
            {remainItems?.map((item, itemIdx) => {
              const onClick = () => {
                handleSearchChange('')
                handleSelectItem(item)
              }
              return renderItem ? (
                <ListboxItem
                  className={cn({
                    'bg-default-200/50': itemIdx === willSelected,
                  })}
                  key={item.key}
                  value={item.key}
                  {...renderItem(item, {
                    isActive: itemIdx === willSelected,
                    isSelected: valueKeys.has(item.key),
                  })}
                  onClick={onClick}
                />
              ) : (
                <ListboxItem
                  key={item.key}
                  className={cn({
                    'bg-default-200/50': itemIdx === willSelected,
                  })}
                  value={item.key}
                  endContent={valueKeys.has(item.key) ? <RiCheckLine size={12} /> : undefined}
                  onClick={onClick}
                >
                  {item.label}
                </ListboxItem>
              )
            }) ?? []}
          </Listbox>
        </div>
      )}
    </div>
  )
}
