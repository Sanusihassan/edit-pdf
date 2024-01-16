import { PencilIcon } from "@heroicons/react/24/outline";
import React from "react";
import { FaRegClock } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";

const FileInfoPanel = () => {
  return (
    <div className="file-info-panel">
      <strong className="file-name">Resume.pdf</strong>&nbsp;
      <button className="edit">
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
