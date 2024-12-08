'use client'

import {
  EditorCommand,
  EditorCommandEmpty,
  EditorCommandItem,
  EditorCommandList,
  EditorContent,
  EditorRoot,
  type JSONContent,
} from 'novel'
import { ImageResizer, handleCommandNavigation } from 'novel/extensions'
import { memo, useMemo, useRef, useState } from 'react'
import { defaultExtensions } from './extensions'
import { handleImageDrop, handleImagePaste } from 'novel/plugins'
import { slashCommand, suggestionItems } from './slash-command'
import { ColorSelector } from './selectors/color-selector'
import { LinkSelector } from './selectors/link-selector'
import { MathSelector } from './selectors/math-selector'
import { NodeSelector } from './selectors/node-selector'
import { TextButtons } from './selectors/text-buttons'
import { ButtonGroup, Divider, Listbox, ListboxItem } from '@nextui-org/react'
import EditorBubbleCommands from './EditorBubleCommand'
import { EditorEventListeners } from './EditorEventListeners'
import { Attrs } from '@tiptap/pm/model'

interface BlockBasedEditorProps {
  jsonContent?: JSONContent
  onJsonContentChange: (jsonContent: JSONContent) => void
  onPageNodesRemoved?: (attrs: Attrs[], content: JSONContent) => void
  onPageNodesAdded?: (attrs: Attrs[], content: JSONContent) => void
  customExtensions?: any[]
}

export const BlockBasedEditor = memo((props: BlockBasedEditorProps) => {
  const {
    jsonContent,
    onJsonContentChange,
    onPageNodesAdded,
    onPageNodesRemoved,
    customExtensions,
  } = props

  const [openNode, setOpenNode] = useState(false)
  const [openColor, setOpenColor] = useState(false)
  const [openLink, setOpenLink] = useState(false)

  const ref = useRef<HTMLDivElement>(null)
  const addExtensions = useRef(customExtensions)

  const extensions = useMemo(
    () => [...defaultExtensions, slashCommand, ...(addExtensions.current ?? [])],
    [],
  )

  return (
    <EditorRoot>
      <EditorContent
        ref={ref}
        initialContent={jsonContent}
        extensions={extensions}
        className="relative"
        editorProps={{
          handleDOMEvents: {
            keydown: (_view, event) => handleCommandNavigation(event),
          },
          handlePaste: (view, event) => handleImagePaste(view, event, () => {}),
          handleDrop: (view, event, _slice, moved) => handleImageDrop(view, event, moved, () => {}),
          attributes: {
            class: 'focus:outline-none max-w-full',
          },
        }}
        onUpdate={({ editor }) => {
          onJsonContentChange(editor.getJSON())
        }}
        slotAfter={<ImageResizer />}
      >
        <EditorEventListeners
          onPageNodesAdded={onPageNodesAdded}
          onPageNodesRemoved={onPageNodesRemoved}
        />
        <EditorCommand className="z-50 h-fit max-h-[330px] overflow-y-auto rounded-medium bg-content1 px-1 py-2 shadow-small transition-all dark:border dark:border-divider">
          <EditorCommandEmpty className="px-2 text-small text-text-tertiary">
            No results
          </EditorCommandEmpty>
          <Listbox variant="light" as={EditorCommandList}>
            {suggestionItems.map((item) => (
              <ListboxItem
                as={EditorCommandItem}
                value={item.title}
                startContent={
                  <div className="flex h-[40px] w-[40px] items-center justify-center rounded-small bg-default">
                    {item.icon}
                  </div>
                }
                // @ts-expect-error - `onCommand` is valid prop
                onCommand={(val) => item.command?.(val)}
                key={item.title}
                description={item.description}
              >
                {item.title}
              </ListboxItem>
            ))}
          </Listbox>
        </EditorCommand>
        <EditorBubbleCommands>
          <ButtonGroup size="md">
            <NodeSelector open={openNode} onOpenChange={setOpenNode} />
            <Divider orientation="vertical" />
            <LinkSelector open={openLink} onOpenChange={setOpenLink} />
            <Divider orientation="vertical" />
            <MathSelector />
            <Divider orientation="vertical" />
            <TextButtons />
            <Divider orientation="vertical" />
            <ColorSelector open={openColor} onOpenChange={setOpenColor} />
          </ButtonGroup>
        </EditorBubbleCommands>
      </EditorContent>
    </EditorRoot>
  )
})

BlockBasedEditor.displayName = 'BlockBasedEditor'

export default BlockBasedEditor
