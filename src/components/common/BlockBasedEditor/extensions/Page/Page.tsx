import { useCreatePageContext } from '@/components/providers/newpage'
import { Button } from '@nextui-org/react'
import {
  Node,
  NodeViewWrapper,
  ReactNodeViewRenderer,
  ReactNodeViewRendererOptions,
} from '@tiptap/react'
import 'novel'

const PAGE_DATA_ATTRIBUTE = 'data-page-id'

const PageCardComponent = ({ node }: { node: Partial<ReactNodeViewRendererOptions> }) => {
  const id = ((node.attrs as any)?.[PAGE_DATA_ATTRIBUTE] ?? '') as string
  const { createPageData } = useCreatePageContext()
  console.log(createPageData)

  return (
    <NodeViewWrapper>
      <div {...{ [PAGE_DATA_ATTRIBUTE]: id }}>
        <Button className="rounded-small p-2" fullWidth variant="bordered">
          {createPageData?.name ?? "Untitled"}
        </Button>
        {/* <PageCard pageDetail={pageDetail} /> */}
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
          return commands.insertContent({
            type: 'page',
            attrs: {
              [PAGE_DATA_ATTRIBUTE]: options.pageID,
            },
          })
        },
    }
  },

  // addPasteRules() {
  //     if (!this.options.addPasteHandler) {
  //       return [];
  //     }

  //     return [
  //       nodePasteRule({
  //         find: TWITTER_REGEX_GLOBAL,
  //         type: this.type,
  //         getAttributes: (match) => {
  //           return { src: match.input };
  //         },
  //       }),
  //     ];
  //   },

  renderHTML({ HTMLAttributes }) {
    return ['div', HTMLAttributes]
  },
})
