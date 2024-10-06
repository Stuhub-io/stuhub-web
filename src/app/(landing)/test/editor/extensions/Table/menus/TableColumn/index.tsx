import { BubbleMenu as BaseBubbleMenu } from '@tiptap/react'
import React, { useCallback } from 'react'

import { isColumnGripSelected } from './utils'
import { MenuProps, ShouldShowProps } from '../../../../type'
import { Button } from '@nextui-org/react'
import { RiAddLine, RiDeleteBinLine } from 'react-icons/ri'

export const TableColumnMenu = React.memo(({ editor, appendTo }: MenuProps): JSX.Element => {
  const shouldShow = useCallback(
    ({ view, state, from }: ShouldShowProps) => {
      if (!state) {
        return false
      }

      return isColumnGripSelected({ editor, view, state, from: from || 0 })
    },
    [editor],
  )

  const onAddColumnBefore = useCallback(() => {
    editor.chain().focus().addColumnBefore().run()
  }, [editor])

  const onAddColumnAfter = useCallback(() => {
    editor.chain().focus().addColumnAfter().run()
  }, [editor])

  const onDeleteColumn = useCallback(() => {
    editor.chain().focus().deleteColumn().run()
  }, [editor])

  return (
    <BaseBubbleMenu
      editor={editor}
      pluginKey="tableColumnMenu"
      updateDelay={0}
      tippyOptions={{
        appendTo: () => {
          return appendTo?.current
        },
        offset: [0, 15],
        popperOptions: {
          modifiers: [{ name: 'flip', enabled: false }],
        },
      }}
      shouldShow={shouldShow}
    >
      <div className="flex flex-col">
        <Button startContent={<RiAddLine size={16} />} onClick={onAddColumnBefore}>
          Add column before
        </Button>
        <Button startContent={<RiAddLine size={16} />} onClick={onAddColumnAfter}>
          Add column after
        </Button>
        <Button startContent={<RiDeleteBinLine size={16} />} onClick={onDeleteColumn}>
          Delete column
        </Button>
      </div>
    </BaseBubbleMenu>
  )
})

TableColumnMenu.displayName = 'TableColumnMenu'

export default TableColumnMenu
