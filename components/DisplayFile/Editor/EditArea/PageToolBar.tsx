import { FaEllipsisH } from "react-icons/fa";
import { AddBlankPage } from "./AddBlankPage";

export const PageToolBar = ({pageNumber}: {
    pageNumber: number;
}) => {
  return (
    <div className="page-toolbar">
      <div className="page-number">#{pageNumber}</div>
      <AddBlankPage layout="editor" />
      <button className="more-tools">
        <FaEllipsisH className="icon" />
      </button>
    </div>
  );
};
