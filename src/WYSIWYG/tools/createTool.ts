import { handleEdit } from "../WYSIWYGFunctionality";

// Individual tool interfaces
export interface Tool {
  execute(options?:any): void;
  stop: PDFToolFunction;
  setEl: (el: HTMLDivElement | null) => void;
}

export abstract class BaseTool implements Tool {
  protected el: HTMLDivElement | null = null;

  public setEl(el: HTMLDivElement | null): void {
    if (el) {
      this.el = el;
    }
  }

  abstract execute(options?: any): void;
  abstract stop(editor: HTMLDivElement | null): void;
}


export type PDFToolFunction = (editor: HTMLDivElement | null) => void;
// Toolbar as a stateful object
export const createTool = (editor: HTMLDivElement | null, setActiveTool: (tool: Tool) => void) => {
  let currentTool: Tool | null = null;

  const setTool = (tool: Tool) => {
    if (currentTool) {
      // Stop the current tool if it's active
      currentTool.stop && currentTool.stop(editor);
    }
    editor?.removeEventListener("mousemove", handleEdit);
    setActiveTool(tool)
    currentTool = tool;
  };

  const executeCurrentTool = () => {
    if (currentTool) {
      // Execute the current tool
      currentTool.execute && currentTool.execute(editor);
    }
  };

  return {
    setTool,
    executeCurrentTool
  };
};

export type createToolRetVal = ReturnType<typeof createTool>;