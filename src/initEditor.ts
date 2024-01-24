import { WYSIWYGFunctionality } from "./WYSIWYGFunctionality";

const styles = `
.page {
  border: none !important;
  zoom: 2
}
.page *, .page {scale: 2}
.page *:focus {
  outline: none;
}

.editable-container {
  max-width: 100%;
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
export const initEditor = (editor: HTMLDivElement | null) => {
  // if (editor) {

  //   const customStyles = document.createElement("style");
  //   customStyles!.textContent = styles;
  //   document?.head.appendChild(customStyles as Node);
  // }
  WYSIWYGFunctionality(editor);
};