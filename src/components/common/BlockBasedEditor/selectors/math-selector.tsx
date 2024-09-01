import { Button } from "@nextui-org/react";
import { cn } from "@/libs/utils";
import { useEditor } from "novel";
import { RiEmpathizeFill } from "react-icons/ri";

export const MathSelector = () => {
  const { editor } = useEditor();

  if (!editor) return null;

  return (
    <Button
      variant="light"
      size="sm"
      className="rounded-none w-12"
      onClick={() => {
        if (editor.isActive("math")) {
          editor.chain().focus().unsetLatex().run();
        } else {
          const { from, to } = editor.state.selection;
          const latex = editor.state.doc.textBetween(from, to);

          if (!latex) return;

          editor.chain().focus().setLatex({ latex }).run();
        }
      }}
    >
      <RiEmpathizeFill
        className={cn("size-4", { "text-blue-500": editor.isActive("math") })}
        strokeWidth={2.3}
      />
    </Button>
  );
};
