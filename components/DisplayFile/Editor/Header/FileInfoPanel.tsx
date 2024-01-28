import { setField } from "@/src/store";
import { PencilIcon } from "@heroicons/react/24/outline";
import React, { useRef, useState } from "react";
import { FaRegClock } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { useDispatch } from "react-redux";

const FileInfoPanel = () => {
  const [edit, setEdit] = useState(false);
  const fileNameInputRef = useRef<HTMLElement | null>(null);
  const dispatch = useDispatch();
  const handleFileNameEdit = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setEdit(true);
    if (fileNameInputRef)
      if (fileNameInputRef.current) {
        const divElement = fileNameInputRef.current;
        const range = document.createRange();
        const selection = window.getSelection();
        range.selectNodeContents(divElement);
        range.collapse(false);
        selection?.removeAllRanges();
        selection?.addRange(range);
        if (!selection) {
          fileNameInputRef.current.focus();
        }
      }
  };
  return (
    <div className="file-info-panel">
      <strong
        className="file-name"
        contentEditable={edit}
        onClick={() => setEdit(true)}
        ref={fileNameInputRef}
        onInput={(e) => {
          const target = e.target as HTMLElement;
          if (target) {
            dispatch(setField({ fileName: target.textContent || ""}));
          }
        }}
      >
        Resume.pdf
      </strong>
      &nbsp;
      <button className="edit" onClick={handleFileNameEdit}>
        <PencilIcon className="icon" />
      </button>
      &nbsp;
      <a href="#" className="document-location">
        My Docs
      </a>{" "}
      <GoDotFill className="icon-dot" />
      <span className="modified-label">Modified on</span>&nbsp;
      <time className="modified-date">Jan 15, 2024</time>&nbsp;
      <FaRegClock className="icon-clock" />
    </div>
  );
};

export { FileInfoPanel };
