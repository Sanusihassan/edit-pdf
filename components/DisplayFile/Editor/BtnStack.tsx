import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToolState, setField, toolType } from "@/src/store";

export const BtnStack = ({
  id,
  children,
  cb,
  ref
}: {
  children: React.ReactNode;
  id: string;
  cb?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  ref?: React.RefObject<HTMLButtonElement>
}) => {
  const dispatch = useDispatch();
  const currentTool = useSelector(
    (state: { tool: ToolState }) => state.tool.currentTool
  );

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (currentTool) {
      dispatch(setField({ currentTool: null}));
    } else {
      dispatch(setField({ currentTool: (id as toolType) }));
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
      ref={ref}
    >
      {children}
    </button>
  );
};
