import { useDispatch, useSelector } from "react-redux";
import { ToolState, setField, toolType } from "@/src/store";
import { useEffect } from "react";

export const BtnStack = ({
  id,
  children,
  cb,
  undo,
  ...props
}: {
  children: React.ReactNode;
  id?: string;
  cb?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  undo?: () => void;
} & React.ComponentProps<"button">) => {
  const dispatch = useDispatch();
  const currentTool = useSelector(
    (state: { tool: ToolState }) => state.tool.currentTool
  );

  useEffect(() => {

  }, [currentTool]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if(!id) {return;}
    if (currentTool) {
      dispatch(setField({ currentTool: null }));
      if (undo) {
        undo();
      }
    } else {
      dispatch(setField({ currentTool: id as toolType }));
    }
    if (cb) {
      cb(e);
    }
  };

  return (
    <button
      className={`btn-stack${id === currentTool ? " active" : ""}`}
      {...props}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};
