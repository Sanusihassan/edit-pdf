import { FaUndo, FaRedo } from "react-icons/fa";
import { EditTools } from "./EditTools";
import { DocumentDuplicateIcon } from "@heroicons/react/24/outline";

export const Tools = () => {
  return (
    <>
      <section className="pdf-tools">
        <div className="a tool-row">
          <button className="btn-stack">
            pages
            <DocumentDuplicateIcon className="icon" />
          </button>
          <button className="btn-stack">
            undo
            <FaUndo className="icon" />
          </button>
          <button className="btn-stack">
            redo
            <FaRedo className="icon" />
          </button>
        </div>
        <EditTools />
        <div className="c tool-row">3</div>
        <div className="d tool-row">4</div>
      </section>
    </>
  );
};
