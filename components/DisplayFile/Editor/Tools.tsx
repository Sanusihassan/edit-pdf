import { FaUndo, FaRedo } from "react-icons/fa";
import { EditTools } from "./EditTools";
import { DocumentDuplicateIcon } from "@heroicons/react/24/outline";
import { TextManipulationTools } from "./TextManipulationTools";
import { Settings } from "./Settings";
import { BtnStack } from "./BtnStack";
export const Tools = () => {
  return (
    <>
      <section className="pdf-tools">
        <div className="a tool-row">
          <BtnStack id="pages">
            pages
            <DocumentDuplicateIcon className="icon" />
          </BtnStack>
          <BtnStack id="undo">
            undo
            <FaUndo className="icon" />
          </BtnStack>
          <BtnStack id="redo">
            redo
            <FaRedo className="icon" />
          </BtnStack>
        </div>
        <EditTools />
        <TextManipulationTools />
        <Settings />
      </section>
    </>
  );
};
