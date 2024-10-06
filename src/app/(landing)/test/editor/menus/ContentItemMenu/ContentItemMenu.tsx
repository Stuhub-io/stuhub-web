// import DragHandle from '@tiptap-pro/extension-drag-handle-react'
import { Editor } from '@tiptap/react'

import useContentItemActions from './hooks/useContentItemActions'
import { useData } from './hooks/useData'
import { useEffect, useState } from 'react'
import { Button, Divider, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react'
import { RiAddLine } from 'react-icons/ri'
import { LuGripVertical } from 'react-icons/lu'

export type ContentItemMenuProps = {
  editor: Editor
}

export const ContentItemMenu = ({ editor }: ContentItemMenuProps) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const data = useData()
  const actions = useContentItemActions(editor, data.currentNode, data.currentNodePos)

  useEffect(() => {
    if (menuOpen) {
      editor.commands.setMeta('lockDragHandle', true)
    } else {
      editor.commands.setMeta('lockDragHandle', false)
    }
  }, [editor, menuOpen])

  return (
    // <DragHandle
    //   pluginKey="ContentItemMenu"
    //   editor={editor}
    //   onNodeChange={data.handleNodeChange}
    //   tippyOptions={{
    //     offset: [-2, 16],
    //     zIndex: 99,
    //   }}
    // >
    <div className="flex items-center gap-0.5">
      <Button onClick={actions.handleAdd}>
        <RiAddLine size={16} />
      </Button>
      <Popover isOpen={menuOpen} onOpenChange={setMenuOpen} placement="bottom">
        <PopoverTrigger>
          <Button>
            <LuGripVertical size={16} />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="flex min-w-[16rem] flex-col">
          <Button onClick={actions.resetTextFormatting}>Clear formatting</Button>

          <Button onClick={actions.copyNodeToClipboard}>Copy to clipboard</Button>

          <Button onClick={actions.duplicateNode}>Duplicate</Button>
          <Divider />
          <Button
            onClick={actions.deleteNode}
            className="bg-red-500 bg-opacity-10 text-red-500 hover:bg-red-500 hover:bg-opacity-20 dark:text-red-500 dark:hover:bg-red-500 dark:hover:bg-opacity-20 dark:hover:text-red-500"
          >
            Delete
          </Button>
        </PopoverContent>
      </Popover>
    </div>
    // </DragHandle>
  )
}
