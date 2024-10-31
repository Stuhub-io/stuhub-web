import { JSONContent, useEditor } from 'novel'
import { memo, useEffect } from 'react'
import { Attrs, Node } from '@tiptap/pm/model'
import { PAGE_DATA_ATTRIBUTE } from './extensions/Page'

interface EditorEventListenersProps {
  onPageNodesRemoved?: (attrs: Attrs[], _: JSONContent) => void
  onPageNodesAdded?: (attrs: Attrs[], _: JSONContent) => void
}

export const EditorEventListeners = memo((props: EditorEventListenersProps) => {
  const { onPageNodesAdded, onPageNodesRemoved } = props
  const { editor } = useEditor()

  useEffect(() => {
    editor?.on('update', ({ transaction, editor }) => {
      const pageNodes = new Set<Attrs>()
      const pageNodesBefore = new Set<Attrs>()

      const deletedNodes = new Set<Attrs>()
      const createdNodes = new Set<Attrs>()

      const trackNodes = (node: Node) => {
        if (node.attrs[PAGE_DATA_ATTRIBUTE]) {
          pageNodes.add(node.attrs)
        }
      }

      const trackBeforeNodes = (node: Node) => {
        if (node.attrs[PAGE_DATA_ATTRIBUTE]) {
          pageNodesBefore.add(node.attrs)

          if (!pageNodes.has(node.attrs)) {
            deletedNodes.add(node.attrs)
          }
        }
      }

      // Traverse the document and before nodes to track the nodes
      transaction.doc.forEach((node) => {
        traverseNode(node, trackNodes)
      })
      transaction.before.forEach((node) => {
        traverseNode(node, trackBeforeNodes)
      })

      pageNodes.forEach((node) => {
        if (!pageNodesBefore.has(node)) {
          createdNodes.add(node)
        }
      })

      if (createdNodes.size > 0) {
        onPageNodesAdded?.(Array.from(createdNodes), editor.getJSON())
      }
      if (deletedNodes.size > 0) {
        onPageNodesRemoved?.(Array.from(deletedNodes), editor.getJSON())
      }
    })
    return () => {
      editor?.off('update')
    }
  }, [editor, onPageNodesAdded, onPageNodesRemoved])
  return null
})

EditorEventListeners.displayName = 'EditorEventListeners'

export const traverseNode = (node: Node, callback?: (_: Node) => void) => {
  callback?.(node)
  const content = node.content as any as {
    content: Node[]
    size: number
  }
  content.content.forEach((child) => {
    traverseNode(child, callback)
  })
}
