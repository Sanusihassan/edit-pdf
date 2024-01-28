import { BaseTool, Tool } from "./createTool";

class TextTool extends BaseTool implements Tool {
  execute(): void {
    if (BaseTool.el) {
      BaseTool.el.addEventListener("click", (e) => this.textToolHandler(e, BaseTool.el));
    }
  }

  stop(): void {
    console.log("event stopped");
    if (BaseTool.el) {
      BaseTool.el.removeEventListener("click", (e) => this.textToolHandler(e, BaseTool.el));
    }
  }

  private textToolHandler(e: MouseEvent, editor: HTMLDivElement | null): void {
    const text = document.createElement("div");
    text.className = "text";
    text.setAttribute("contenteditable", "true");
    if (!editor) return;
    const { clientX, clientY, target } = e;

    // Calculate the relative coordinates
    let rect = editor.getBoundingClientRect();
    text.style.left = `${clientX - rect.left}px`;
    text.style.top = `${clientY - rect.top}px`;
    text.style.transform = `translate(${rect.left}px, ${rect.top}px)`;
    if (target) {
      (target as HTMLElement)?.parentElement?.insertBefore(text, (target as HTMLElement)?.nextElementSibling);
    }
    text.focus();
  }
}

export const textTool: TextTool = new TextTool();


