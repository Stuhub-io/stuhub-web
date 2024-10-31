import {
  Node,
  NodeViewWrapper,
  ReactNodeViewRenderer,
  ReactNodeViewRendererOptions,
} from '@tiptap/react'
import 'novel'
import { editorEmittor } from '../../emitter'
import { BigPageCard } from '@/components/page/BigPageCard'
import { usePageEditorContext } from '@/components/providers/page/page-editor'
import { BigPageCardSkeleton } from '@/components/page/BigPageCard/BigPageCardSkeleton'
import { useEditor } from 'novel'

export const PAGE_DATA_ATTRIBUTE = 'data-page-id'

const PageCardComponent = ({ node }: { node: Partial<ReactNodeViewRendererOptions> }) => {
  const nodeID = ((node.attrs as any)?.[PAGE_DATA_ATTRIBUTE] ?? '') as string
  const { pageMap, pageMutate } = usePageEditorContext()

  const currentPage = pageMap?.[nodeID]
  const { editor } = useEditor()

  if (!editor) {
    return null
  }

  const handleRemove = () => {
    const toDeleteNode = editor.$node('page', { [PAGE_DATA_ATTRIBUTE]: nodeID })
    if (!toDeleteNode) {
      return false
    }
    editor.chain().deleteRange({
      from: toDeleteNode.from - 1,
      to: toDeleteNode.to - 1,
    }).run()
    return false
  }

  return (
    <NodeViewWrapper contentEditable={false}>
      <div {...{ [PAGE_DATA_ATTRIBUTE]: nodeID }} contentEditable={false} className="w-fit">
        {currentPage ? (
          <BigPageCard
            pageDetail={currentPage}
            onSuccess={pageMutate}
            onBeforeArchive={handleRemove}
          />
        ) : (
          <BigPageCardSkeleton />
        )}
      </div>
    </NodeViewWrapper>
  )
}

export interface PageCardOptions {
  /**
   * Controls if the paste handler for tweets should be added.
   * @default true
   * @example false
   */
  addPasteHandler: boolean

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  HTMLAttributes: Record<string, any>
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    page: {
      /**
       * Insert a tweet
       * @param options The tweet attributes
       * @example editor.commands.setTweet({ src: 'https://x.com/seanpk/status/1800145949580517852' })
       */
      deletePage: (options: { pageID: string }) => ReturnType
      setPage: (options: { pageID: string }) => ReturnType
    }
  }
}

export const PageNode = Node.create<PageCardOptions>({
  name: 'page',
  selectable: true,
  addOptions() {
    return {
      addPasteHandler: true,
      HTMLAttributes: {},
    }
  },
  inline: false,
  group: 'block',
  draggable: true,
  addNodeView() {
    return ReactNodeViewRenderer(PageCardComponent, { attrs: this.options.HTMLAttributes })
  },

  addAttributes() {
    return {
      [PAGE_DATA_ATTRIBUTE]: {
        default: '',
        parseHTML: (element) => element.getAttribute(PAGE_DATA_ATTRIBUTE),
        renderHTML: (attributes) => ({
          [PAGE_DATA_ATTRIBUTE]: attributes[PAGE_DATA_ATTRIBUTE],
        }),
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: `div[${PAGE_DATA_ATTRIBUTE}]`,
      },
    ]
  },

  addCommands() {
    return {
      setPage:
        (options) =>
        ({ commands }) => {
          const ok = commands.insertContent({
            type: 'page',
            attrs: {
              [PAGE_DATA_ATTRIBUTE]: options.pageID,
            },
          })
          setTimeout(() => {
            editorEmittor.emit('pageAdd', { pageID: options.pageID })
          }, 100)
          return ok
        },
    }
  },
  // addPasteRules() {
  //   return [
  //     nodePasteRule({
  //       find: (text: string) => {
  //         console.log('find', text)
  //         return null
  //       },
  //       getAttributes: (text: string) => {
  //         console.log('getAttributes', text)
  //         return {}
  //       },
  //       type: this.type,
  //       getContent: (attrs: Attrs) => {
  //         console.log('getContent', attrs)
  //         return [] as JSONContent[]
  //       },
  //     }),
  //   ]
  // },
  renderHTML({ HTMLAttributes }) {
    return ['div', HTMLAttributes]
  },
})
