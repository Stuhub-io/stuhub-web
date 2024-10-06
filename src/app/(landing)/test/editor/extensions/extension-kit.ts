'use client'

export class API {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public static uploadImage = async (_: File) => {
    console.log('Image upload is disabled in the demo... Please implement the API.uploadImage method in your project.')
    await new Promise(r => setTimeout(r, 500))
    return '/placeholder-image.jpg'
  }
}

import {
  BlockquoteFigure,
  CharacterCount,
  CodeBlock,
  Color,
  // Details,
  // DetailsContent,
  // DetailsSummary,
  Document,
  Dropcursor,
  // Emoji,
  Figcaption,
  // FileHandler,
  Focus,
  FontFamily,
  FontSize,
  Heading,
  Highlight,
  HorizontalRule,
  ImageBlock,
  Link,
  Placeholder,
  Selection,
  SlashCommand,
  StarterKit,
  Subscript,
  Superscript,
  Table,
  // TableOfContents,
  TableCell,
  TableHeader,
  TableRow,
  TextAlign,
  TextStyle,
  TrailingNode,
  Typography,
  Underline,
  // emojiSuggestion,
  Columns,
  Column,
  TaskItem,
  TaskList,
  // UniqueID,
} from '.'

// @ts-expect-error - no types available
import UniqueId from "tiptap-unique-id";

import { ImageUpload } from './ImageUpload'
// import { isChangeOrigin } from '@tiptap/extension-collaboration'
import { generateUUID } from '@/libs/uuid';

// interface ExtensionKitProps {
//   // provider?: HocuspocusProvider | null
// }

export const ExtensionKit = () => [
  Document,
  Columns,
  TaskList,
  TaskItem.configure({
    nested: true,
  }),
  Column,
  Selection,
  Heading.configure({
    levels: [1, 2, 3, 4, 5, 6],
  }),
  HorizontalRule,
  // UniqueID.configure({
  //   types: ['paragraph', 'heading', 'blockquote', 'codeBlock', 'table'],
  //   filterTransaction: transaction => !isChangeOrigin(transaction),
  // }),
  UniqueId.configure({
    attributeName: "id",
    types: ["heading", 'paragraph', 'blockquote', 'codeBlock', 'table'],
    createId: () => generateUUID(),
  }),
  StarterKit.configure({
    document: false,
    dropcursor: false,
    heading: false,
    horizontalRule: false,
    blockquote: false,
    history: false,
    codeBlock: false,
  }),
  // Details.configure({
  //   persist: true,
  //   HTMLAttributes: {
  //     class: 'details',
  //   },
  // }),
  // DetailsContent,
  // DetailsSummary,
  CodeBlock,
  TextStyle,
  FontSize,
  FontFamily,
  Color,
  TrailingNode,
  Link.configure({
    openOnClick: false,
  }),
  Highlight.configure({ multicolor: true }),
  Underline,
  CharacterCount.configure({ limit: 50000 }),
  ImageUpload.configure({
    // clientId: provider?.document?.clientID,
    clientId: null,
  }),
  ImageBlock,
  // FileHandler.configure({
  //   allowedMimeTypes: ['image/png', 'image/jpeg', 'image/gif', 'image/webp'],
  //   onDrop: (currentEditor, files, pos) => {
  //     files.forEach(async file => {
  //       const url = await API.uploadImage(file)

  //       currentEditor.chain().setImageBlockAt({ pos, src: url }).focus().run()
  //     })
  //   },
  //   onPaste: (currentEditor, files) => {
  //     files.forEach(async file => {
  //       const url = await API.uploadImage(file)

  //       return currentEditor
  //         .chain()
  //         .setImageBlockAt({ pos: currentEditor.state.selection.anchor, src: url })
  //         .focus()
  //         .run()
  //     })
  //   },
  // }),
  // Emoji.configure({
  //   enableEmoticons: true,
  //   suggestion: emojiSuggestion,
  // }),
  TextAlign.extend({
    addKeyboardShortcuts() {
      return {}
    },
  }).configure({
    types: ['heading', 'paragraph'],
  }),
  Subscript,
  Superscript,
  Table,
  TableCell,
  TableHeader,
  TableRow,
  Typography,
  Placeholder.configure({
    includeChildren: true,
    showOnlyCurrent: false,
    placeholder: () => '',
  }),
  SlashCommand,
  Focus,
  Figcaption,
  BlockquoteFigure,
  Dropcursor.configure({
    width: 2,
    class: 'ProseMirror-dropcursor border-black',
  }),
]

export default ExtensionKit
