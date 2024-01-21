import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToolState, setActiveButton } from "@/src/store";

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

  const activeButton = useSelector(
    (state: { tool: ToolState }) => state.tool.activeButton
  );

  const handleClick = () => {
    dispatch(setActiveButton(id));
    if (cb) {
      cb();
    }
  };

  return (
    <button
      className={`btn-stack${id === activeButton ? " active" : ""}`}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};
