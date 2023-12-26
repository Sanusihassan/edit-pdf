import { Dispatch } from "react";
// @ts-ignore
import { AnyAction } from "@reduxjs/toolkit";
import type { errors as _ } from "../content/content"; // import the errors constant

import { validateFiles } from "../utils";
import { ToolState, hideTool, resetErrorMessage } from "../store";
export const handleChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  dispatch: Dispatch<AnyAction>,
  setFiles: (files: FileList | File[]) => void,
  extension: string,
  errors: typeof _,
  files: File[],
  state: {
    path: string;
    focus: boolean;
    click: boolean;
  }
) => {
  const _files = (e.target?.files as FileList) || null;
  const isValid = validateFiles(_files, extension, errors, dispatch, state);
  if (isValid) {
    setFiles([...files, ...Array.from(!_files ? [] : _files)]);
  }
  if (isValid && files) {
    dispatch(hideTool());
    dispatch(resetErrorMessage());
  }
};
