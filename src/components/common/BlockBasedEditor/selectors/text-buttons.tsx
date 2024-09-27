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
      isActive: (editor) => editor.isActive('bold'),
      command: (editor) => editor.chain().focus().toggleBold().run(),
      icon: RiBold,
    },
    {
      name: 'italic',
      isActive: (editor) => editor.isActive('italic'),
      command: (editor) => editor.chain().focus().toggleItalic().run(),
      icon: RiItalic,
    },
    {
      name: 'underline',
      isActive: (editor) => editor.isActive('underline'),
      command: (editor) => editor.chain().focus().toggleUnderline().run(),
      icon: RiUnderline,
    },
    {
      name: 'strike',
      isActive: (editor) => editor.isActive('strike'),
      command: (editor) => editor.chain().focus().toggleStrike().run(),
      icon: RiStrikethrough,
    },
    {
      name: 'code',
      isActive: (editor) => editor.isActive('code'),
      command: (editor) => editor.chain().focus().toggleCode().run(),
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
          onSelect={(editor: any) => {
            item.command(editor)
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
