import { toolType } from "../store";
import { enableEditing } from "./enableEditing";
import { createToolRetVal } from "./tools/createTool";
import { textTool } from "./tools/textTool";
let current: HTMLElement | null = null;
export const WYSIWYGFunctionality = (
  editor: HTMLDivElement | null,
  currentTool: toolType | null,
  tool: createToolRetVal
) => {
  if (!currentTool) {
    // enable wysiwyg
    editor?.addEventListener("mousemove", handleEdit);
    return;
  }
  console.log("current working tool is:", tool.currentTool);
  // disable wysiwyg
  editor?.removeEventListener("mousemove", handleEdit);
  switch (currentTool) {
    case "Text":
      tool.setTool(textTool);
      textTool.execute(editor);
      break;
  }
};

export const handleEdit = (e: Event) => {
  current = e.target as HTMLElement;
  if (current && current.className !== "page") {
    enableEditing(current);
  }
};
