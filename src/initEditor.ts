const styles = `
::selection {
  background-color: #b6f0fc
}

.caret {
  animation: blink-animation 1s step-end infinite;
  position: absolute;
  width: 2px;
}

@keyframes blink-animation {
  50% {
    color: transparent;
  }
}
`;
export const initEditor = (iframe: HTMLIFrameElement | null) => {
  if (iframe) {
    iframe.addEventListener("load", () => {
      // Access the contentDocument of the iframe
      const iframeDocument =
        iframe?.contentDocument || iframe?.contentWindow?.document;
      const html = iframeDocument?.documentElement;
      const customStyles = iframeDocument?.createElement("style");
      customStyles!.textContent = styles;
      iframeDocument?.head?.appendChild(customStyles as Node);
      const pageContainer = html?.querySelector("#page-container");
      pageContainerEditor(pageContainer as HTMLElement);
      // html?.setAttribute("contenteditable", "true");
      const caret = iframeDocument?.createElement("div");
      caret!.className = "caret";
      html?.addEventListener("click", (e) => {
        const current = e.relatedTarget || e.target;
        const { x, y } = e;
        const { height, color, fontWeight } = window.getComputedStyle(
          current as Element
        );
        caret!.style.cssText = `height: ${height}px; color: ${color}; top: ${y}px; left: ${x}px; font-weight: ${fontWeight}`;
        caret!.textContent = "|";
        // caret!.style.fontSize =fontSize;
        // caret!.style.color =color;
        console.log(current, caret);
        html.appendChild(caret as Element);
      });
      html?.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          //   get the current element and double it's css top property
        }
      });
    });
  }
};

const pageContainerEditor = (pageContainer: HTMLElement | null | undefined) => {
  pageContainer?.setAttribute("contenteditable", "true");
};
