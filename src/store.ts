import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
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
  showPages: boolean;
}
type WritableDraft<T> = {
  -readonly [K in keyof T]: Draft<T[K]>;
};

type k = keyof WritableDraft<ToolState>;

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
  headerHeight: null,
  showPages: true
};

const toolSlice = createSlice({
  name: "tool",
  initialState,
  reducers: {
    resetErrorMessage(state: ToolState) {
      state.errorMessage = "";
      state.showErrorMessage = false;
      state.errorCode = null;
      state.isSubmitted = false;
    },
    setField(state, action: PayloadAction<Partial<ToolState>>) {
      // Loop over all the keys in the action payload
      Object.keys(action.payload).forEach((key) => {
        // Cast the key to keyof ToolState to ensure it's a valid key
        const typedKey = key as k;
        const value = action.payload[typedKey];
        if (value !== undefined) {
          // @ts-ignore
          state[typedKey] = value;
        }
      });
    },
  },
});

export const {
  setField,
  resetErrorMessage,
} = toolSlice.actions;

export default toolSlice.reducer;
