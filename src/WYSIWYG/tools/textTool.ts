import { Tool } from "./createTool";

export const textTool: Tool = {
  execute(editor) {
    editor?.addEventListener("click", (e) => textToolHandler(e, editor));
  },
  stop(editor) {
    console.log("event stopped");
    editor?.removeEventListener("click", (e) => textToolHandler(e, editor));
  },
};

// this handler handles when the text tool is selected and it runs everytime when click happens
// the problem is that the text is not inserted exactly where the mouse clicks
const textToolHandler = (e: MouseEvent, editor: HTMLDivElement | null) => {
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
};
