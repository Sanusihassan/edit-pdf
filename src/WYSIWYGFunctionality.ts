import { enableEditing } from "./WYSIWYG/enableEditing";
let current: HTMLElement | null = null;

export const WYSIWYGFunctionality = (editor: HTMLDivElement | null) => {
  // enable wysiwyg
  editor?.querySelector(".page")?.addEventListener("mousemove", handleEdit);
};

export const handleEdit = (e: Event) => {
  current = e.target as HTMLElement;
  if (current) {
    enableEditing(current);
  }
};
