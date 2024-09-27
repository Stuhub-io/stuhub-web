import { EditorBubble, useEditor } from 'novel'
import {} from 'novel/plugins'
import { type ReactNode } from 'react'

interface EditorBubbleCommandsProps {
  children: ReactNode
}
const EditorBubbleCommands = ({ children }: EditorBubbleCommandsProps) => {
  const { editor } = useEditor()

  if (!editor) return null
  return (
    <EditorBubble
      tippyOptions={{
        placement: 'top',
        onHidden: () => {
          editor.chain().unsetHighlight().run()
        },
      }}
      className="bg-content2 rounded-medium w-fit max-w-[calc(100vw-100px)] shadow-medium"
    >
      {children}
    </EditorBubble>
  )
}

export default EditorBubbleCommands
