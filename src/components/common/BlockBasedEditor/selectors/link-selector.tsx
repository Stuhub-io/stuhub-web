import { Button, Input } from '@nextui-org/react'
import { PopoverContent, PopoverTrigger, Popover } from '@nextui-org/react'

import { useEditor } from 'novel'
import { useEffect, useRef } from 'react'
import { RiArrowRightUpLine, RiCheckLine, RiDeleteBin2Fill } from 'react-icons/ri'

export function isValidUrl(url: string) {
  try {
    new URL(url)
    return true
  } catch (_e) {
    return false
  }
}
export function getUrlFromString(str: string) {
  if (isValidUrl(str)) return str
  try {
    if (str.includes('.') && !str.includes(' ')) {
      return new URL(`https://${str}`).toString()
    }
  } catch (_e) {
    return null
  }
}
interface LinkSelectorProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const LinkSelector = ({ open, onOpenChange }: LinkSelectorProps) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const { editor } = useEditor()

  // Autofocus on input by default
  useEffect(() => {
    inputRef.current?.focus()
  })
  if (!editor) return null

  return (
    <Popover isOpen={open} onOpenChange={onOpenChange} size="md" offset={10}>
      <PopoverTrigger>
        <Button
          color={editor.isActive('link') ? 'primary' : 'default'}
          variant="light"
          startContent={<RiArrowRightUpLine />}
        >
          Link
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <form
          onSubmit={(e) => {
            const target = e.currentTarget as HTMLFormElement
            e.preventDefault()
            const input = target[0] as HTMLInputElement
            const url = getUrlFromString(input.value)
            if (url) {
              editor.chain().focus().setLink({ href: url }).run()
              onOpenChange(false)
            }
          }}
          className="flex"
        >
          <Input
            ref={inputRef}
            type="text"
            placeholder="Paste a link"
            defaultValue={editor.getAttributes('link').href || ''}
            classNames={{
              inputWrapper: 'rounded-r-none'
            }}
            size="sm"
          />
          {editor.getAttributes('link').href ? (
            <Button
              isIconOnly
              variant="bordered"
              type="button"
              className="flex h-8 items-center rounded-sm p-1 text-red-600 transition-all hover:bg-red-100 dark:hover:bg-red-800"
              onClick={() => {
                editor.chain().focus().unsetLink().run()
                if (inputRef.current) {
                  inputRef.current.value = ''
                }
                onOpenChange(false)
              }}
            >
              <RiDeleteBin2Fill />
            </Button>
          ) : (
            <Button isIconOnly className="h-8" type="submit">
              <RiCheckLine />
            </Button>
          )}
        </form>
      </PopoverContent>
    </Popover>
  )
}
