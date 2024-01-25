import { enableEditing } from "./enableEditing";

function addTextAtMousePosition(event: MouseEvent) {
  // Create a new element with contenteditable attribute
  const editableElement = document.createElement("div") as HTMLDivElement;
  editableElement.setAttribute("contenteditable", "true");
  editableElement.classList.add("editable-element");

  // Set initial position based on mouse click
  editableElement.style.left = event.pageX + "px";
  editableElement.style.top = event.pageY + "px";

  // Append the element to the body
  document.body.appendChild(editableElement);

  // Focus on the new element
  editableElement.focus();

  // Add blur event listener to delete the element if empty
  editableElement.addEventListener("blur", () => {
    const content = editableElement.innerText.trim();
    if (content === "") {
      // Delete the element if it's empty
      document.body.removeChild(editableElement);
    }
  });
}

// export const addEditableElement = (editor: HTMLDivElement | null) => {
// };
