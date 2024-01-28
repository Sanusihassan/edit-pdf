import { FaUndo, FaRedo } from "react-icons/fa";
import { EditTools } from "./EditTools";
import { DocumentDuplicateIcon } from "@heroicons/react/24/outline";
import { TextManipulationTools } from "./TextManipulationTools";
import { Settings } from "./Settings";
import { BtnStack } from "./BtnStack";
import { useFileStore } from "@/src/file-store";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToolState } from "@/src/store";
const Pages = () => {
  const { activeTool } = useFileStore();
  const el = useRef(null);
  const dispatch = useDispatch();
  const showPages = useSelector(
    (state: { tool: ToolState }) => state.tool.showPages
  );
  const currentTool = useSelector(
    (state: { tool: ToolState }) => state.tool.currentTool
  );
  useEffect(() => {
    if (el.current && activeTool) {
      activeTool.setEl(el.current);
      console.log(activeTool)
      activeTool.execute({
        dispatch,
        showPages,
      });
    }
  }, [activeTool, el.current, currentTool]);
  return (
    <BtnStack id="pages" ref={el}>
      pages
      <DocumentDuplicateIcon className="icon" />
    </BtnStack>
  );
};
export const Tools = () => {
  return (
    <>
      <section className="pdf-tools">
        <div className="a tool-row">
          <Pages />
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
