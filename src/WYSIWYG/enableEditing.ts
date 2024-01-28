export const enableEdit = (el: HTMLElement) => {
  el.setAttribute("contenteditable", "true");
  el.style.whiteSpace = "nowrap";
};

export const handleEdit = (e: Event) => {
  const current = e.target as HTMLElement;
  enableEdit(current);
};

export const enableEditing = (editor: HTMLDivElement | null) => {
  editor?.querySelectorAll(".page").forEach((page) => {
    page?.addEventListener("mousemove", handleEdit);
  });
};


export const disableEditing = (editor: HTMLDivElement | null) => {
  editor?.querySelectorAll(".page").forEach((page) => {
    page?.removeEventListener("mousemove", handleEdit);
  });
};
