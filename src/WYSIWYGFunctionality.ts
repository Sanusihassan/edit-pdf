import { addEditableElement } from "./WYSIWYG/addEditableElement";

export const WYSIWYGFunctionality = (editor: HTMLDivElement | null) => {
  // const nodes = editor?.querySelectorAll(".page *");

  // nodes?.forEach((el) => {
  //   const hasTextChild = Array.from(el.childNodes).some(
  //     (child) => child.nodeType === Node.TEXT_NODE
  //   );
  //   // If the element has a child of type text, set contenteditable to true
  //   if (hasTextChild) {
      // el.setAttribute("contenteditable", "true");
      // (el as HTMLElement).style.whiteSpace = "nowrap";
  //   }
  // });


  // enable wysiwyg

  

  addEditableElement(editor);
};
