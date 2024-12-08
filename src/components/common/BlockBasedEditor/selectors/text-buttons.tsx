import { EditorBubbleItem, useEditor } from 'novel'
import type { SelectorItem } from './node-selector'
import { Button } from '@nextui-org/react'
import { RiBold, RiCodeFill, RiItalic, RiStrikethrough, RiUnderline } from 'react-icons/ri'

export const TextButtons = () => {
  const { editor } = useEditor()
  if (!editor) return null
  const items: SelectorItem[] = [
    {
      name: 'bold',
      isActive: (e) => e.isActive('bold'),
      command: (e) => e.chain().focus().toggleBold().run(),
      icon: RiBold,
    },
    {
      name: 'italic',
      isActive: (e) => e.isActive('italic'),
      command: (e) => e.chain().focus().toggleItalic().run(),
      icon: RiItalic,
    },
    {
      name: 'underline',
      isActive: (e) => e.isActive('underline'),
      command: (e) => e.chain().focus().toggleUnderline().run(),
      icon: RiUnderline,
    },
    {
      name: 'strike',
      isActive: (e) => e.isActive('strike'),
      command: (e) => e.chain().focus().toggleStrike().run(),
      icon: RiStrikethrough,
    },
    {
      name: 'code',
      isActive: (e) => e.isActive('code'),
      command: (e) => e.chain().focus().toggleCode().run(),
      icon: RiCodeFill,
    },
  ]
  return (
    <>
      {items.map((item) => (
        <Button
          key={item.name}
          variant="light"
          as={EditorBubbleItem}
          onSelect={(e: any) => {
            item.command(e)
          }}
          isIconOnly
          color={item.isActive(editor) ? 'primary' : 'default'}
        >
          <item.icon />
        </Button>
      ))}
    </>
  )
}
