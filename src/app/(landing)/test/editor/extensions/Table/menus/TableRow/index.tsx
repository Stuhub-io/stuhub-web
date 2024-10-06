import { BubbleMenu as BaseBubbleMenu } from '@tiptap/react'
import React, { useCallback } from 'react'

import { isRowGripSelected } from './utils'
import { MenuProps, ShouldShowProps } from '../../../../type'
import { Button } from '@nextui-org/react'
import { RiArrowDownSLine, RiArrowUpSLine, RiDeleteBinLine } from 'react-icons/ri'

export const TableRowMenu = React.memo(({ editor, appendTo }: MenuProps): JSX.Element => {
  const shouldShow = useCallback(
    ({ view, state, from }: ShouldShowProps) => {
      if (!state || !from) {
        return false
      }

      return isRowGripSelected({ editor, view, state, from })
    },
    [editor],
  )

  const onAddRowBefore = useCallback(() => {
    editor.chain().focus().addRowBefore().run()
  }, [editor])

  const onAddRowAfter = useCallback(() => {
    editor.chain().focus().addRowAfter().run()
  }, [editor])

  const onDeleteRow = useCallback(() => {
    editor.chain().focus().deleteRow().run()
  }, [editor])

  return (
    <BaseBubbleMenu
      editor={editor}
      pluginKey="tableRowMenu"
      updateDelay={0}
      tippyOptions={{
        appendTo: () => {
          return appendTo?.current
        },
        placement: 'left',
        offset: [0, 15],
        popperOptions: {
          modifiers: [{ name: 'flip', enabled: false }],
        },
      }}
      shouldShow={shouldShow}
    >
      <div className="flex flex-col">
        <Button startContent={<RiArrowUpSLine size={16} />} onClick={onAddRowBefore}>
          Add row before
        </Button>
        <Button startContent={<RiArrowDownSLine size={16} />} onClick={onAddRowAfter}>
          Add row after
        </Button>
        <Button onClick={onDeleteRow} startContent={<RiDeleteBinLine size={16} />}>
          Delete row
        </Button>
      </div>
    </BaseBubbleMenu>
  )
})

TableRowMenu.displayName = 'TableRowMenu'

export default TableRowMenu
