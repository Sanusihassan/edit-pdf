import { FaUndo, FaRedo } from "react-icons/fa";
import { EditTools } from "./EditTools";
import { DocumentDuplicateIcon } from "@heroicons/react/24/outline";
import { TextManipulationTools } from "./TextManipulationTools";
import { Settings } from "./Settings";
import { BtnStack } from "./BtnStack";
import { useDispatch, useSelector } from "react-redux";
import { ToolState, setField } from "@/src/store";
export const Tools = () => {
  const dispatch = useDispatch();
  const showPages = useSelector(
    (state: { tool: ToolState }) => state.tool.showPages
  );
  return (
    <>
      <section className="pdf-tools">
        <div className="a tool-row">
          <BtnStack
            id="pages"
            cb={() => {
              dispatch(setField({ showPages: !showPages }));
            }}
          >
            pages
            <DocumentDuplicateIcon className="icon" />
          </BtnStack>

          <BtnStack
            id="undo"
            cb={() => {
              document.execCommand("undo", false, "null");
            }}
          >
            undo
            <FaUndo className="icon" />
          </BtnStack>
          <BtnStack
            id="redo"
            cb={() => {
              document.execCommand("redo", false, "null");
            }}
          >
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
