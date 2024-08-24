"use client";

import {
  EditorBubble,
  EditorCommand,
  EditorCommandEmpty,
  EditorCommandItem,
  EditorCommandList,
  EditorContent,
  EditorRoot,
  type JSONContent,
} from "novel";
import { ImageResizer, handleCommandNavigation } from "novel/extensions";
import { useEffect, useState } from "react";
// import { useDebouncedCallback } from "use-debounce";
import { defaultExtensions } from "./extensions";
import { handleImageDrop, handleImagePaste } from "novel/plugins";
// import GenerativeMenuSwitch from "./generative/generative-menu-switch";
// import { uploadFn } from "./image-upload";
import { slashCommand, suggestionItems } from "./slash-command";
import { ColorSelector } from "./selectors/color-selector";
import { LinkSelector } from "./selectors/link-selector";
import { MathSelector } from "./selectors/math-selector";
import { NodeSelector } from "./selectors/node-selector";
import { TextButtons } from "./selectors/text-buttons";
import { Divider } from "@nextui-org/react";

// const hljs = require('highlight.js');

const extensions = [...defaultExtensions, slashCommand];

export const BlockBasedEditor = () => {
  const [initialContent, setInitialContent] = useState<null | JSONContent>(null);

  const [openNode, setOpenNode] = useState(false);
  const [openColor, setOpenColor] = useState(false);
  const [openLink, setOpenLink] = useState(false);

//   //Apply Codeblock Highlighting on the HTML from editor.getHTML()
//   const highlightCodeblocks = (content: string) => {
//     const doc = new DOMParser().parseFromString(content, 'text/html');
//     doc.querySelectorAll('pre code').forEach((el) => {
//       // @ts-ignore
//       // https://highlightjs.readthedocs.io/en/latest/api.html?highlight=highlightElement#highlightelement
//       hljs.highlightElement(el);
//     });
//     return new XMLSerializer().serializeToString(doc);
//   };

//   const debouncedUpdates = useDebouncedCallback(async (editor: EditorInstance) => {
//     const json = editor.getJSON();
//     setCharsCount(editor.storage.characterCount.words());
//     window.localStorage.setItem("html-content", highlightCodeblocks(editor.getHTML()));
//     window.localStorage.setItem("novel-content", JSON.stringify(json));
//     window.localStorage.setItem("markdown", editor.storage.markdown.getMarkdown());
//     setSaveStatus("Saved");
//   }, 500);

  useEffect(() => {
    const content = window.localStorage.getItem("novel-content");
    if (content) setInitialContent(JSON.parse(content));
    else setInitialContent({});
  }, []);

  if (!initialContent) return null;

  return (

      <EditorRoot>
        <EditorContent
          initialContent={initialContent}
          extensions={extensions}
          editorProps={{
            handleDOMEvents: {
              keydown: (_view, event) => handleCommandNavigation(event),
            },
            handlePaste: (view, event) => handleImagePaste(view, event, () => {}),
            handleDrop: (view, event, _slice, moved) => handleImageDrop(view, event, moved, () => {}),
            attributes: {
              class:
                "prose prose-lg dark:prose-invert focus:outline-none max-w-full",
            },
          }}
          onUpdate={({ editor }) => {
            console.log(editor.getJSON());
            // debouncedUpdates(editor);
          }}
          slotAfter={<ImageResizer />}
        >
          <EditorCommand className="z-50 h-[500px] max-h-[330px] overflow-y-auto rounded-md border border-muted bg-background px-1 py-2 shadow-md transition-all">
            <EditorCommandEmpty className="px-2 text-muted-foreground">No results</EditorCommandEmpty>
            <EditorCommandList>
              {suggestionItems.map((item) => (
                <EditorCommandItem
                  value={item.title}
                  onCommand={(val) => item.command?.(val)}
                  className="flex w-full items-center space-x-2 rounded-md px-2 py-1 text-left text-sm hover:bg-accent aria-selected:bg-accent"
                  key={item.title}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-md border border-muted bg-background">
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </div>
                </EditorCommandItem>
              ))}
            </EditorCommandList>
            <EditorBubble>
            <Divider  orientation="vertical" />
            <NodeSelector open={openNode} onOpenChange={setOpenNode} />
            <Divider  orientation="vertical" />

            <LinkSelector open={openLink} onOpenChange={setOpenLink} />
            <Divider  orientation="vertical" />
            <MathSelector />
            <Divider  orientation="vertical" />
            <TextButtons />
            <Divider  orientation="vertical" />
            <ColorSelector open={openColor} onOpenChange={setOpenColor} />
            </EditorBubble>
          </EditorCommand>
        </EditorContent>
      </EditorRoot>
  );
};
