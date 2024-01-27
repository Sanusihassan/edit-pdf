import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Tool } from "./WYSIWYG/tools/createTool";
export type toolType = "pages" |
"undo" |
"redo" |
"Text" |
"Sign" |
"Initials" |
"Date" |
"Cross" |
"Check" |
"Circle" |
"Image" |
"TBox" |
"Sticky" |
"Erase" |
"Highlight" |
"Blackout" |
"Tools" |
"Comment" |
"Replace" |
"Search" |
"Settings" |
"HideMenu";
export interface ToolState {
  showTool: boolean;
  isSubmitted: boolean;
  errorMessage: string;
  showErrorMessage: boolean;
  errorCode: string | null;
  path: string;
  click: boolean;
  focus: boolean;
  showDownloadBtn: boolean;
  showOptions: boolean;
  nav_height: number;
  currentTool: toolType | null;
  fileName: string;
  headerHeight: number | null;
}

const initialState: ToolState = {
  showTool: true,
  errorMessage: "",
  showErrorMessage: false,
  isSubmitted: false,
  errorCode: null,
  path: "",
  click: false,
  focus: false,
  showDownloadBtn: false,
  showOptions: false,
  nav_height: 0,
  currentTool: null,
  fileName: "",
  headerHeight: null
};

const toolSlice = createSlice({
  name: "tool",
  initialState,
  reducers: {
    showTool(state: ToolState) {
      state.showTool = true;
    },
    setClick(state: ToolState, action: PayloadAction<boolean>) {
      state.click = action.payload;
    },
    setFocus(state: ToolState, action: PayloadAction<boolean>) {
      state.focus = action.payload;
    },
    setShowDownloadBtn(state: ToolState, action: PayloadAction<boolean>) {
      state.showDownloadBtn = action.payload;
    },
    setPath(state: ToolState, action: PayloadAction<string>) {
      state.path = action.payload;
    },
    hideTool(state: ToolState) {
      state.showTool = false;
    },
    setErrorMessage(state: ToolState, action: PayloadAction<string>) {
      state.errorMessage = action.payload;
      state.showErrorMessage = true;
    },
    resetErrorMessage(state: ToolState) {
      state.errorMessage = "";
      state.showErrorMessage = false;
      state.errorCode = null;
      state.isSubmitted = false;
    },
    setErrorCode(state: ToolState, action: PayloadAction<string | null>) {
      state.errorCode = action.payload;
    },
    setIsSubmitted(state: ToolState, action: PayloadAction<boolean>) {
      state.isSubmitted = action.payload;
    },
    setShowOptions(state: ToolState, action: PayloadAction<boolean>) {
      state.showOptions = action.payload;
    },
    setNavHeight(state: ToolState, action: PayloadAction<number>) {
      state.nav_height = action.payload;
    },
    setCurrentTool: (state, action: PayloadAction<toolType | null>) => {
      state.currentTool = action.payload;
    },
    setFileName: (state, action: PayloadAction<string>) => {
      state.fileName = action.payload;
    },
    setHeaderHeight: (state, action: PayloadAction<number | null>) => {
      state.headerHeight = action.payload;
    }
  },
});

export const {
  showTool,
  hideTool,
  setErrorMessage,
  resetErrorMessage,
  setErrorCode,
  setIsSubmitted,
  setPath,
  setClick,
  setFocus,
  setShowDownloadBtn,
  setShowOptions,
  setNavHeight,
  setCurrentTool,
  setFileName,
  setHeaderHeight,
} = toolSlice.actions;

export default toolSlice.reducer;
