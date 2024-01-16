import { PrinterIcon } from "@heroicons/react/24/outline";
import React from "react";
import { FaCrown } from "react-icons/fa";
import { GoDownload } from "react-icons/go";
import { LuFileSearch2 } from "react-icons/lu";
import { MdDone } from "react-icons/md";
import { PiFilePlus } from "react-icons/pi";

interface FileManagerProps {
  // Add any necessary props
}

const FileManager: React.FC<FileManagerProps> = () => {
  return (
    <div className="file-manager-container">
      <div className="button-group">
        <button className="upload-button">
          <PiFilePlus />
          Upload New
        </button>
        <button className="find-button">
          <LuFileSearch2 />
          Find Another Form
        </button>
      </div>
      <span className="bar">|</span>
      <div className="button-group">
        <button className="save-button">
          <GoDownload />
        </button>
        <button className="print-button">
          <PrinterIcon className="icon" />
        </button>
        <button className="trail-button">
          <FaCrown />
        </button>
        <button className="done-button">
          <MdDone />
          DONE
        </button>
      </div>
    </div>
  );
};

export default FileManager;
