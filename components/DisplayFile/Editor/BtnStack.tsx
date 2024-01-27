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
  cb?: () => void;
}) => {
  const dispatch = useDispatch();

  const currentTool = useSelector(
    (state: { tool: ToolState }) => state.tool.currentTool
  );

  const handleClick = () => {
    if (currentTool) {
      dispatch(setCurrentTool(null));
    } else {
      dispatch(setCurrentTool(id as toolType));
    }
    if (cb) {
      cb();
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
