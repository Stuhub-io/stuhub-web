import { RiCodeBlock, RiDivideLine, RiImageLine, RiLayoutColumnLine, RiListCheck, RiListOrdered, RiListRadio, RiQuoteText, RiTableLine } from 'react-icons/ri'
import { Group } from './types'
import { LuHeading1, LuHeading2, LuHeading3 } from 'react-icons/lu'

export const GROUPS: Group[] = [
  // {
  //   name: 'ai',
  //   title: 'AI',
  //   commands: [
  //     {
  //       name: 'aiWriter',
  //       label: 'AI Writer',
  //       iconName: 'Sparkles',
  //       description: 'Let AI finish your thoughts',
  //       shouldBeHidden: editor => editor.isActive('columns'),
  //       action: editor => editor.chain().focus().setAiWriter().run(),
  //     },
  //     {
  //       name: 'aiImage',
  //       label: 'AI Image',
  //       iconName: 'Sparkles',
  //       description: 'Generate an image from text',
  //       shouldBeHidden: editor => editor.isActive('columns'),
  //       action: editor => editor.chain().focus().setAiImage().run(),
  //     },
  //   ],
  // },
  {
    name: 'format',
    title: 'Format',
    commands: [
      {
        name: 'heading1',
        label: 'Heading 1',
        icon: <LuHeading1 size={18} />,
        description: 'High priority section title',
        aliases: ['h1'],
        action: editor => {
          editor.chain().focus().setHeading({ level: 1 }).run()
        },
      },
      {
        name: 'heading2',
        label: 'Heading 2',
        icon: <LuHeading2 size={18} />,
        description: 'Medium priority section title',
        aliases: ['h2'],
        action: editor => {
          editor.chain().focus().setHeading({ level: 2 }).run()
        },
      },
      {
        name: 'heading3',
        label: 'Heading 3',
        icon: <LuHeading3 size={18}/>,
        description: 'Low priority section title',
        aliases: ['h3'],
        action: editor => {
          editor.chain().focus().setHeading({ level: 3 }).run()
        },
      },
      {
        name: 'bulletList',
        label: 'Bullet List',
        icon: <RiListRadio size={18} />,
        description: 'Unordered list of items',
        aliases: ['ul'],
        action: editor => {
          editor.chain().focus().toggleBulletList().run()
        },
      },
      {
        name: 'numberedList',
        label: 'Numbered List',
        icon: <RiListOrdered size={18} />,
        description: 'Ordered list of items',
        aliases: ['ol'],
        action: editor => {
          editor.chain().focus().toggleOrderedList().run()
        },
      },
      {
        name: 'taskList',
        label: 'Task List',
        icon: <RiListCheck size={18} />,
        description: 'Task list with todo items',
        aliases: ['todo'],
        action: editor => {
          editor.chain().focus().toggleTaskList().run()
        },
      },
      // {
      //   name: 'toggleList',
      //   label: 'Toggle List',
      //   iconName: 'ListCollapse',
      //   description: 'Toggles can show and hide content',
      //   aliases: ['toggle'],
      //   action: editor => {
      //     editor.chain().focus().setDetails().run()
      //   },
      // },
      {
        name: 'blockquote',
        label: 'Blockquote',
        icon: <RiQuoteText size={18} />,
        description: 'Element for quoting',
        action: editor => {
          editor.chain().focus().setBlockquote().run()
        },
      },
      {
        name: 'codeBlock',
        label: 'Code Block',
        icon: <RiCodeBlock size={18}/>,
        description: 'Code block with syntax highlighting',
        shouldBeHidden: editor => editor.isActive('columns'),
        action: editor => {
          editor.chain().focus().setCodeBlock().run()
        },
      },
    ],
  },
  {
    name: 'insert',
    title: 'Insert',
    commands: [
      {
        name: 'table',
        label: 'Table',
        icon: <RiTableLine size={18}/>, 
        description: 'Insert a table',
        shouldBeHidden: editor => editor.isActive('columns'),
        action: editor => {
          editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: false }).run()
        },
      },
      {
        name: 'image',
        label: 'Image',
        icon: <RiImageLine size={18}/>,
        description: 'Insert an image',
        aliases: ['img'],
        action: editor => {
          editor.chain().focus().setImageUpload().run()
        },
      },
      {
        name: 'columns',
        label: 'Columns',
        icon: <RiLayoutColumnLine size={18}/>,
        description: 'Add two column content',
        aliases: ['cols'],
        shouldBeHidden: editor => editor.isActive('columns'),
        action: editor => {
          editor
            .chain()
            .focus()
            .setColumns()
            .focus(editor.state.selection.head - 1)
            .run()
        },
      },
      {
        name: 'horizontalRule',
        label: 'Horizontal Rule',
        icon: <RiDivideLine size={18}/>,
        description: 'Insert a horizontal divider',
        aliases: ['hr'],
        action: editor => {
          editor.chain().focus().setHorizontalRule().run()
        },
      },
    ],
  },
]

export default GROUPS
