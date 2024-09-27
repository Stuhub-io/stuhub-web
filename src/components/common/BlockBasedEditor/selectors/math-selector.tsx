import { Button } from '@nextui-org/react'
import { useEditor } from 'novel'
import { PiMathOperations } from 'react-icons/pi'

export const MathSelector = () => {
  const { editor } = useEditor()

  if (!editor) return null

  return (
    <Button
      variant="light"
      className="w-12 rounded-none"
      onClick={() => {
        if (editor.isActive('math')) {
          editor.chain().focus().unsetLatex().run()
        } else {
          const { from, to } = editor.state.selection
          const latex = editor.state.doc.textBetween(from, to)

          if (!latex) return

          editor.chain().focus().setLatex({ latex }).run()
        }
      }}
      color={editor.isActive('math') ? 'primary' : 'default'}
    >
      <PiMathOperations />
    </Button>
  )
}
