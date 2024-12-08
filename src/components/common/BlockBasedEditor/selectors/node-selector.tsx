import { EditorBubbleItem, useEditor } from 'novel'

import { Button, Listbox, ListboxItem } from '@nextui-org/react'
import { Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react'
import {
  RiArrowDownSLine,
  RiCheckboxFill,
  RiCheckLine,
  RiCodeBlock,
  RiH1 as RiHeading,
  RiListOrdered,
  RiListRadio,
  RiText,
  RiTextBlock,
  RiH2 as RiHeading2,
} from 'react-icons/ri'
import { IconType } from 'react-icons/lib'

export type SelectorItem = {
  name: string
  icon: IconType
  command: (editor: NonNullable<ReturnType<typeof useEditor>['editor']>) => void
  isActive: (editor: NonNullable<ReturnType<typeof useEditor>['editor']>) => boolean
}

const items: SelectorItem[] = [
  {
    name: 'Text',
    icon: RiText,
    command: (editor) => editor.chain().focus().clearNodes().run(),
    // I feel like there has to be a more efficient way to do this – feel free to PR if you know how!
    isActive: (editor) =>
      editor.isActive('paragraph') &&
      !editor.isActive('bulletList') &&
      !editor.isActive('orderedList'),
  },
  {
    name: 'Heading 1',
    icon: RiHeading,
    command: (editor) => editor.chain().focus().clearNodes().toggleHeading({ level: 1 }).run(),
    isActive: (editor) => editor.isActive('heading', { level: 1 }),
  },
  {
    name: 'Heading 2',
    icon: RiHeading2,
    command: (editor) => editor.chain().focus().clearNodes().toggleHeading({ level: 2 }).run(),
    isActive: (editor) => editor.isActive('heading', { level: 2 }),
  },
  {
    name: 'Heading 3',
    icon: RiHeading2,
    command: (editor) => editor.chain().focus().clearNodes().toggleHeading({ level: 3 }).run(),
    isActive: (editor) => editor.isActive('heading', { level: 3 }),
  },
  {
    name: 'To-do List',
    icon: RiCheckboxFill,
    command: (editor) => editor.chain().focus().clearNodes().toggleTaskList().run(),
    isActive: (editor) => editor.isActive('taskItem'),
  },
  {
    name: 'Bullet List',
    icon: RiListRadio,
    command: (editor) => editor.chain().focus().clearNodes().toggleBulletList().run(),
    isActive: (editor) => editor.isActive('bulletList'),
  },
  {
    name: 'Numbered List',
    icon: RiListOrdered,
    command: (editor) => editor.chain().focus().clearNodes().toggleOrderedList().run(),
    isActive: (editor) => editor.isActive('orderedList'),
  },
  {
    name: 'Quote',
    icon: RiTextBlock,
    command: (editor) => editor.chain().focus().clearNodes().toggleBlockquote().run(),
    isActive: (editor) => editor.isActive('blockquote'),
  },
  {
    name: 'Code',
    icon: RiCodeBlock,
    command: (editor) => editor.chain().focus().clearNodes().toggleCodeBlock().run(),
    isActive: (editor) => editor.isActive('codeBlock'),
  },
]
interface NodeSelectorProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const NodeSelector = ({ open, onOpenChange }: NodeSelectorProps) => {
  const { editor } = useEditor()
  if (!editor) return null
  const activeItem = items.filter((item) => item.isActive(editor)).pop() ?? {
    name: 'Multiple',
  }

  return (
    <Popover isOpen={open} onOpenChange={onOpenChange}>
      <PopoverTrigger>
        <Button variant="light" endContent={<RiArrowDownSLine />}>
          {activeItem.name}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-48 p-1">
        <Listbox>
          {items.map((item) => (
            <ListboxItem
              key={item.name}
              as={EditorBubbleItem}
              onSelect={(edt: any) => {
                item.command(edt)
                onOpenChange(false)
              }}
              startContent={<item.icon className="h-4 w-4" />}
              endContent={activeItem.name === item.name && <RiCheckLine />}
            >
              {item.name}
            </ListboxItem>
          ))}
        </Listbox>
      </PopoverContent>
    </Popover>
  )
}
