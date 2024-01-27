import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToolState, setCurrentTool, toolType } from "@/src/store";

export const BtnStack = ({
  id,
  children,
  cb,
}: {
  children: React.ReactNode;
  id: string;
  cb?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}) => {
  const dispatch = useDispatch();

  const currentTool = useSelector(
    (state: { tool: ToolState }) => state.tool.currentTool
  );

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (currentTool) {
      dispatch(setCurrentTool(null));
    } else {
      dispatch(setCurrentTool(id as toolType));
    }
    if (cb) {
      cb(e);
    }
  };
  
  return (
    <button
      className={`btn-stack${id === currentTool ? " active" : ""}`}
      onClick={handleClick}
      title={id}
    >
      {children}
    </button>
  );
};
