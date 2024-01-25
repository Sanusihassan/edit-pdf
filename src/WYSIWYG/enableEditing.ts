export const enableEditing = (el: HTMLElement) => {
  el.setAttribute("contenteditable", "true");
  el.style.whiteSpace = "nowrap";
};
