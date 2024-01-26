import { enableEditing } from "./enableEditing";
let current: HTMLElement | null = null;

export const WYSIWYGFunctionality = (editor: HTMLDivElement | null) => {
  // enable wysiwyg
  editor?.addEventListener("mousemove", handleEdit);
};

export const handleEdit = (e: Event) => {
  current = e.target as HTMLElement;
  if (current && current.className !== "page") {
    enableEditing(current);
    // current.addEventListener("keydown", (event) => {

    // })
  }
};
