export const textToolHandler = (
  e: Event,
  editor: HTMLDivElement | Element | null
): void => {
  const text = document.createElement("div");
  text.className = "text";
  text.setAttribute("contenteditable", "true");
  if (!editor) return;
  const { clientX, clientY, target } = e as MouseEvent;

  // Calculate the relative coordinates
  let rect = editor.getBoundingClientRect();
  text.style.left = `${clientX - rect.left}px`;
  text.style.top = `${clientY - rect.top}px`;
  text.style.transform = `translate(${rect.left}px, ${rect.top}px)`;
  if (target) {
    (target as HTMLElement)?.parentElement?.insertBefore(
      text,
      (target as HTMLElement)?.nextElementSibling
    );
  }
  text.focus();
};
