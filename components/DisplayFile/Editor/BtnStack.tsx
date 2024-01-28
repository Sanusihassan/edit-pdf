/**
 * when i click on the current btn stack it gains the active state and when i click on another btn stack it removes it from both of them,
 * i want to add it to the current one i.e if it's id equal to the current tool.
 * what i want is to add it to the current one but remove it from the others
 */
import { useDispatch, useSelector } from "react-redux";
import { ToolState, setField, toolType } from "@/src/store";
import { useEffect } from "react";
import { useFileStore } from "@/src/file-store";
import { disableEditing, enableEditing } from "@/src/WYSIWYG/enableEditing";

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
  const { editor } = useFileStore();
  const dispatch = useDispatch();
  const currentTool = useSelector(
    (state: { tool: ToolState }) => state.tool.currentTool
  );

  useEffect(() => {}, [currentTool]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (!id) {
      return;
    }

    // Check if the current button is the active one
    if (currentTool === id) {
      // If it is, dispatch an action to set the current tool to null
      dispatch(setField({ currentTool: null }));
      disableEditing(editor);
      if (undo) {
        undo();
      }
    } else {
      // If it isn't, dispatch an action to set the current tool to the clicked button's id
      enableEditing(editor);
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
