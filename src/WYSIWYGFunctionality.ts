export const WYSIWYGFunctionality = (editor: HTMLDivElement | null) => {
  const nodes = editor?.querySelectorAll(".page *");
  nodes?.forEach((el) => {
    const hasTextChild = Array.from(el.childNodes).some(
      (child) => child.nodeType === Node.TEXT_NODE
    );

    // If the element has a child of type text, set contenteditable to true
    if (hasTextChild) {
      el.setAttribute("contenteditable", "true");
      // el.parentElement.style.maxWidth = "100%";
      // @ts-ignore
      el!.style!.whiteSpace = "nowrap";
      let rect = el.getBoundingClientRect();
      const { left, top } = rect;
      // @ts-ignore
      const { top: t, left: l } = el.style;
      console.log(top, left);
      // @ts-ignore
      el.style.transform = `translate(${left - l}px, -${top - t}px)`;
      // el.style.position = "static";
    }
  });
};
