import { Dispatch, RefObject, SetStateAction } from "react";
import { create } from "zustand";
type ToolFunction = (e: Event, page: HTMLDivElement | Element | null) => void;

export interface FileStore {
  files: File[];
  fileInput: RefObject<HTMLInputElement> | null;
  submitBtn: React.RefObject<HTMLButtonElement> | null;
  downloadBtn: React.RefObject<HTMLAnchorElement> | null;
  filesLengthOnSubmit: number;
  imageUrls: {
    file: File;
    imageUrl: string;
  }[];
  editor: HTMLDivElement | null;
  currentTool: ToolFunction | null;
  setCurrentTool: (currentTool: ToolFunction) => void;
  setFiles: (files: FileList | File[]) => void;
  setFileInput: (refEl: RefObject<HTMLInputElement> | null) => void;
  setSubmitBtn: (refEl: React.RefObject<HTMLButtonElement> | null) => void;
  setDownloadBtn: (refEl: React.RefObject<HTMLAnchorElement> | null) => void;
  setImageUrls: Dispatch<
    SetStateAction<
      {
        file: File;
        imageUrl: string;
      }[]
    >
  >;
  setFilesLengthOnSubmit(value: number): void;
  setEditor(editor: HTMLDivElement | null): void;
}

export const useFileStore = create<FileStore>((set) => ({
  files: [],
  fileInput: null,
  downloadBtn: null,
  submitBtn: null,
  imageUrls: [],
  filesLengthOnSubmit: 0,
  editor: null,
  currentTool: null,
  setFiles: (files: FileList | File[]) => {
    const uniqueFiles = new Set<File>();

    if (files instanceof FileList) {
      Array.from(files).forEach((file) => uniqueFiles.add(file));
    } else {
      files.forEach((file) => uniqueFiles.add(file));
    }
    set({ files: Array.from(uniqueFiles) });
  },
  setFileInput(refEl: RefObject<HTMLInputElement> | null) {
    set({ fileInput: refEl });
  },
  setSubmitBtn(refEl: React.RefObject<HTMLButtonElement> | null) {
    set({ submitBtn: refEl });
  },
  setDownloadBtn(refEl: React.RefObject<HTMLAnchorElement> | null) {
    set({ downloadBtn: refEl });
  },
  setImageUrls(value: SetStateAction<{ file: File; imageUrl: string }[]>) {
    set((prevState) => ({
      imageUrls:
        typeof value === "function" ? value(prevState.imageUrls) : value,
    }));
  },
  setFilesLengthOnSubmit(value: number) {
    set({ filesLengthOnSubmit: value });
  },
  setEditor(editor) {
    set({ editor });
  },
  setCurrentTool: (currentTool) => set({ currentTool }),
}));
