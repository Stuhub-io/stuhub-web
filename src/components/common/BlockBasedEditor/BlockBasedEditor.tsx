'use client'

import {
  EditorCommand,
  EditorCommandEmpty,
  EditorCommandItem,
  EditorCommandList,
  EditorContent,
  EditorRoot,
  type JSONContent,
} from 'novel'
import { ImageResizer, handleCommandNavigation } from 'novel/extensions'
import { useState } from 'react'
// import { useDebouncedCallback } from "use-debounce";
import { defaultExtensions } from './extensions'
import { handleImageDrop, handleImagePaste } from 'novel/plugins'
// import GenerativeMenuSwitch from "./generative/generative-menu-switch";
// import { uploadFn } from "./image-upload";
import { slashCommand, suggestionItems } from './slash-command'
import { ColorSelector } from './selectors/color-selector'
import { LinkSelector } from './selectors/link-selector'
import { MathSelector } from './selectors/math-selector'
import { NodeSelector } from './selectors/node-selector'
import { TextButtons } from './selectors/text-buttons'
import { ButtonGroup, Divider } from '@nextui-org/react'
import EditorBubbleCommands from './EditorBubleCommand'

// const hljs = require('highlight.js');

const extensions = [...defaultExtensions, slashCommand]

interface BlockBasedEditorProps {
  jsonContent?: JSONContent
  onJsonContentChange: (jsonContent: JSONContent) => void
}

export const BlockBasedEditor = (props: BlockBasedEditorProps) => {
  const { jsonContent, onJsonContentChange } = props

  const [openNode, setOpenNode] = useState(false)
  const [openColor, setOpenColor] = useState(false)
  const [openLink, setOpenLink] = useState(false)

  //Apply Codeblock Highlighting on the HTML from editor.getHTML()
  // const highlightCodeblocks = (content: string) => {
  //   const doc = new DOMParser().parseFromString(content, 'text/html');
  //   doc.querySelectorAll('pre code').forEach((el) => {
  //     // @ts-ignore
  //     // https://highlightjs.readthedocs.io/en/latest/api.html?highlight=highlightElement#highlightelement
  //     hljs.highlightElement(el);
  //   });
  //   return new XMLSerializer().serializeToString(doc);
  // };

  return (
    <EditorRoot>
      <EditorContent
        autofocus
        initialContent={jsonContent}
        extensions={extensions}
        className="relative"
        editorProps={{
          handleDOMEvents: {
            keydown: (_view, event) => handleCommandNavigation(event),
          },
          handlePaste: (view, event) => handleImagePaste(view, event, () => {}),
          handleDrop: (view, event, _slice, moved) => handleImageDrop(view, event, moved, () => {}),
          attributes: {
            class: 'focus:outline-none max-w-full',
          },
        }}
        onUpdate={({ editor }) => {
          onJsonContentChange(editor.getJSON())
        }}
        slotAfter={<ImageResizer />}
      >
        <EditorCommand className="z-50 h-fit max-h-[330px] overflow-y-auto rounded-medium bg-content1 px-1 py-2 shadow-small transition-all dark:border dark:border-divider">
          <EditorCommandEmpty className="px-2 text-small text-text-tertiary">
            No results
          </EditorCommandEmpty>
          <EditorCommandList>
            {suggestionItems.map((item) => (
              <EditorCommandItem
                value={item.title}
                onCommand={(val) => item.command?.(val)}
                className="flex w-full items-center space-x-2 rounded-small px-2 py-1 text-left text-sm aria-selected:bg-default/40"
                key={item.title}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-default/20">
                  {item.icon}
                </div>
                <div>
                  <p className="font-medium text-text-secondary">{item.title}</p>
                  <p className="text-xs text-text-tertiary">{item.description}</p>
                </div>
              </EditorCommandItem>
            ))}
          </EditorCommandList>
        </EditorCommand>

        <EditorBubbleCommands>
          <ButtonGroup size="md">
            <NodeSelector open={openNode} onOpenChange={setOpenNode} />
            <Divider orientation="vertical" />
            <LinkSelector open={openLink} onOpenChange={setOpenLink} />
            <Divider orientation="vertical" />
            <MathSelector />
            <Divider orientation="vertical" />
            <TextButtons />
            <Divider orientation="vertical" />
            <ColorSelector open={openColor} onOpenChange={setOpenColor} />
          </ButtonGroup>
        </EditorBubbleCommands>
      </EditorContent>
    </EditorRoot>
  )
}

export default BlockBasedEditor
