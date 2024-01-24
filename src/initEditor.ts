const styles = `
#page-container:focus {
  outline: none;
}
#page-container *:focus {
  outline: none;
}
::selection {
  background-color: #b6f0fc
}

.caret {
  animation: blink-animation 1s step-end infinite;
  position: absolute;
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
      html?.querySelectorAll("#page-container *").forEach((el) => {
        // Check if the element has a child of type text
        const hasTextChild = Array.from(el.childNodes).some(
          (child) => child.nodeType === Node.TEXT_NODE
        );

        // If the element has a child of type text, set contenteditable to true
        if (hasTextChild) {
          el.setAttribute("contenteditable", "true");
        }
      });
      pageContainerEditor(pageContainer as HTMLElement, iframeDocument);
      // html?.addEventListener("keydown", (e) => {
      //   if (e.key === "Enter") {
      //     //   get the current element and double it's css top property
      //   } else if (e.key === " ") {
      //     // Prevent the default behavior of the space key
      //     e.preventDefault();

      //     // Insert a space character at the current cursor position
      //     document.execCommand("insertText", false, " ");
      //   }
      // });
    });
  }
};

const pageContainerEditor = (
  pageContainer: HTMLElement | null | undefined,
  iframeDocument: Document | undefined
) => {
  // handle typing:
  pageContainer?.addEventListener("keydown", function (event) {
    // Check if the pressed key is the space key
    console.log("handled")
    
  });
  const caret = iframeDocument?.createElement("div");
  caret!.className = "caret";
  pageContainer?.appendChild(caret as HTMLElement);

  caret!.style.cssText = `
    position: absolute;
    visibility: hidden;
 `;

  window.addEventListener("mousedown", (e) => {
    const { color, fontWeight, fontSize } = window.getComputedStyle(
      e.target as Element
    );

    const rect = (e.target as Element).getBoundingClientRect();

    caret!.style.cssText = `
      color: ${color};
      top: ${rect.top + window.pageYOffset}px;
      left: ${rect.left + window.pageXOffset}px;
      font-weight: ${fontWeight};
      font-size: ${fontSize};
      visibility: visible;
    `;

    caret!.textContent = "|";
  });

  window.addEventListener("mouseup", () => {
    caret!.style.visibility = "hidden";
  });
};
