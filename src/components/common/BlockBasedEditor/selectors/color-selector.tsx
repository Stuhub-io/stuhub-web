import { EditorBubbleItem, useEditor } from 'novel'

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from '@nextui-org/react'
import { RiCheckLine, RiArrowDownSLine } from 'react-icons/ri'
import { cn } from '@/libs/utils'
export interface BubbleColorMenuItem {
  name: string
  color: string
}

const TEXT_COLORS: BubbleColorMenuItem[] = [
  {
    name: 'Default',
    color: 'var(--novel-black)',
  },
  {
    name: 'Purple',
    color: '#9f7aea', // Tailwind Purple 500
  },
  {
    name: 'Red',
    color: '#f56565', // Tailwind Red 500
  },
  {
    name: 'Yellow',
    color: '#ecc94b', // Tailwind Yellow 500
  },
  {
    name: 'Blue',
    color: '#4299e1', // Tailwind Blue 500
  },
  {
    name: 'Green',
    color: '#48bb78', // Tailwind Green 500
  },
  {
    name: 'Orange',
    color: '#ed8936', // Tailwind Orange 500
  },
  {
    name: 'Pink',
    color: '#ed64a6', // Tailwind Pink 500
  },
  {
    name: 'Gray',
    color: '#a0aec0', // Tailwind Gray 500
  },
]

const HIGHLIGHT_COLORS: BubbleColorMenuItem[] = [
  {
    name: 'Default',
    color: 'var(--novel-highlight-default)',
  },
  {
    name: 'Purple',
    color: '#b794f4', // Tailwind Purple 400
  },
  {
    name: 'Red',
    color: '#fc8181', // Tailwind Red 400
  },
  {
    name: 'Yellow',
    color: '#f6e05e', // Tailwind Yellow 400
  },
  {
    name: 'Blue',
    color: '#63b3ed', // Tailwind Blue 400
  },
  {
    name: 'Green',
    color: '#68d391', // Tailwind Green 400
  },
  {
    name: 'Orange',
    color: '#f6ad55', // Tailwind Orange 400
  },
  {
    name: 'Pink',
    color: '#f687b3', // Tailwind Pink 400
  },
  {
    name: 'Gray',
    color: '#cbd5e0', // Tailwind Gray 400
  },
]

interface ColorSelectorProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const ColorSelector = ({ open, onOpenChange }: ColorSelectorProps) => {
  const { editor } = useEditor()

  if (!editor) return null
  const activeColorItem = TEXT_COLORS.find(({ color }) => editor.isActive('textStyle', { color }))

  const activeHighlightItem = HIGHLIGHT_COLORS.find(({ color }) =>
    editor.isActive('highlight', { color }),
  )

  return (
    <Dropdown isOpen={open} onOpenChange={onOpenChange}>
      <DropdownTrigger>
        <Button
          variant="light"
          style={{
            color: activeColorItem?.color,
            backgroundColor: activeHighlightItem?.color,
          }}
          endContent={<RiArrowDownSLine />}
        >
          A
        </Button>
      </DropdownTrigger>
      <DropdownMenu variant="flat" className="max-h-96 overflow-y-auto">
        <DropdownSection title="Color">
          {TEXT_COLORS.map(({ name, color }, index) => (
            <DropdownItem
              as={EditorBubbleItem}
              key={name}
              showDivider={index === TEXT_COLORS.length - 1}
              onSelect={() => {
                editor.commands.unsetColor()
                name !== 'Default' &&
                  editor
                    .chain()
                    .focus()
                    .setColor(color || '')
                    .run()
                onOpenChange(false)
              }}
              startContent={
                <div className="px-1 text-sm" style={{ color }}>
                  A
                </div>
              }
            >
              {name}
            </DropdownItem>
          ))}
        </DropdownSection>
        <DropdownSection title="Background">
          {HIGHLIGHT_COLORS.map(({ name, color }) => (
            <DropdownItem
              key={name}
              as={EditorBubbleItem}
              onSelect={() => {
                editor.commands.unsetHighlight()
                name !== 'Default' && editor.chain().focus().setHighlight({ color }).run()
                onOpenChange(false)
              }}
              startContent={
                <div
                  className={cn('rounded-sm px-1 text-sm text-black', {
                    'text-default-foreground': name === 'Default',
                  })}
                  style={{ backgroundColor: color }}
                >
                  A
                </div>
              }
              endContent={editor.isActive('highlight', { color }) && <RiCheckLine />}
            >
              {name}
            </DropdownItem>
          ))}
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  )
}
