import { EditorContent } from '@tiptap/react'
import React, { useRef } from 'react'
import { useBlockEditor } from './useBlockEditor'
import { ContentItemMenu, LinkMenu, TextMenu } from './menus'
import { ColumnsMenu } from './extensions/MultiColumn/menus'
import { TableColumnMenu, TableRowMenu } from './extensions/Table/menus'
import ImageBlockMenu from './extensions/ImageBlock/components/ImageBlockMenu'
import '@/styles/index.css'

// eslint-disable-next-line no-empty-pattern
export const BlockEditor = () => {
  const menuContainerRef = useRef(null)

  const { editor } = useBlockEditor({})

  //   if (!editor || !users) {
  //     return null
  //   }

  if (!editor) {
    return null
  }

  return (
    <div className="flex h-full" ref={menuContainerRef}>
      <div className="relative flex h-full flex-1 flex-col overflow-hidden">
        {/* <EditorHeader
          editor={editor}
          collabState={collabState}
          users={users}
          isSidebarOpen={leftSidebar.isOpen}
          toggleSidebar={leftSidebar.toggle}
        /> */}
        <EditorContent editor={editor} className="flex-1 overflow-y-auto" />
        <ContentItemMenu editor={editor} />
        <LinkMenu editor={editor} appendTo={menuContainerRef} />
        <TextMenu editor={editor} />
        <ColumnsMenu editor={editor} appendTo={menuContainerRef} />
        <TableRowMenu editor={editor} appendTo={menuContainerRef} />
        <TableColumnMenu editor={editor} appendTo={menuContainerRef} />
        <ImageBlockMenu editor={editor} appendTo={menuContainerRef} />
      </div>
    </div>
  )
}

export default BlockEditor
