export const textToolHandler = (
  e: Event,
  editor: HTMLDivElement | Element | null
): void => {
  const text = document.createElement("div");
  text.className = "text";
  text.setAttribute("contenteditable", "true");
  if (!editor) return;
  const { x, y } = e as MouseEvent;

  // Calculate the relative coordinates
  let rect = editor.getBoundingClientRect();
  text.style.left = `${x}px`;
  text.style.top = `${y}px`;
  // if (target) {
  //   (target as HTMLElement)?.parentElement?.insertBefore(
  //     text,
  //     (target as HTMLElement)?.nextElementSibling
  //   );
  // }
  editor?.appendChild(text);
  text.focus();
};
