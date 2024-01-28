// this is my code:
import { NextRouter } from "next/router";
import { Dispatch, useEffect, useMemo, useState } from "react";
import { Action } from "@reduxjs/toolkit";
import type { errors as _ } from "../content";
import { getDocument } from "pdfjs-dist";
import { PDFDocumentProxy, PageViewport, RenderTask } from "pdfjs-dist";
const pdfjsWorker = await import("pdfjs-dist/build/pdf.worker.entry");
import { GlobalWorkerOptions } from "pdfjs-dist";
GlobalWorkerOptions.workerSrc = pdfjsWorker;

export function useLoadedImage(src: string): HTMLImageElement | null {
  const [loadedImage, setLoadedImage] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => setLoadedImage(img);
  }, [src]);

  return loadedImage;
}
export function useRotatedImage(imageUrl: string): string | null {
  const image = useLoadedImage(imageUrl);

  return useMemo(() => {
    if (!image) return null;

    const canvas = document.createElement("canvas");
    canvas.width = image.height;
    canvas.height = image.width;
    const ctx = canvas.getContext("2d")!;
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((90 * Math.PI) / 180);
    ctx.drawImage(image, -image.width / 2, -image.height / 2);
    return canvas.toDataURL();
  }, [image]);
}

const DEFAULT_PDF_IMAGE = "/images/corrupted.png";
function emptyPDFHandler(dispatch: Dispatch<Action>, errors: _) {
  dispatch(setField({ errorMessage: errors.EMPTY_FILE.message }));
  dispatch(setField({ errorCode: "ERR_EMPTY_FILE" }));
  return DEFAULT_PDF_IMAGE;
}
// i don't know why but when i pass any other file type except images or pdfs this function will cause the application to crash by entering an infinite loop
export const getFileDetailsTooltipContent = async (
  file: File,
  pages: string,
  page: string,
  lang: string,
  dispatch: Dispatch<Action>,
  errors: _
): Promise<string> => {
  const sizeInBytes = file.size;
  let size: string = "";
  let isoCode = lang === "fr" ? "fr-FR" : lang == "" ? "en" : lang;
  size = new Intl.NumberFormat(isoCode, {
    notation: "compact",
    style: "unit",
    unit: "byte",
    unitDisplay: "narrow",
  }).format(sizeInBytes);
  let tooltipContent = size;
  if (file.size === 0) {
    emptyPDFHandler(dispatch, errors);
    throw Error("ERROR: FILE_SIZE_ZERO");
  } else {
    if (
      file.type !== "image/png" &&
      file.type !== "image/jpeg" &&
      file.type !== "application/pdf"
    ) {
      return tooltipContent;
    }
    try {
      if (file.type === "image/jpeg" || file.type === "image/png") {
        const image = new Image();
        image.src = URL.createObjectURL(file);
        await new Promise<void>((resolve) => {
          image.onload = () => {
            tooltipContent += ` - ${image.width} x ${image.height}`;
            resolve();
          };
        });
      } else if (file.type === "application/pdf") {
        const url = URL.createObjectURL(file);
        const pdf = await getDocument(url).promise;

        const pageCount = pdf.numPages || 0;
        tooltipContent += ` - ${
          lang === "ar" && pageCount === 1 ? "" : pageCount + " "
        }${pageCount > 1 ? pages : page}`;
        URL.revokeObjectURL(url);
        if (!file.size) {
          emptyPDFHandler(dispatch, errors);
        }
      }
    } catch (e) {
      if (!file.size) {
        emptyPDFHandler(dispatch, errors);
      }
    }
  }

  return tooltipContent;
};

/**
 * this is the current function and it's working,
 * but i want to display the pdf.png file while fetching the first page from the pdf
 */

export async function getFirstPageAsImage(
  file: File,
  dispatch: Dispatch<Action>,
  errors: _
): Promise<string> {
  const fileUrl = URL.createObjectURL(file);
  if (!file.size) {
    return emptyPDFHandler(dispatch, errors);
  } else {
    try {
      const loadingTask = getDocument(fileUrl);
      const pdf: PDFDocumentProxy = await loadingTask.promise;
      const page = await pdf.getPage(1); // Get the first page

      const scale = 1.5;
      const viewport: PageViewport = page.getViewport({ scale });

      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      if (!context) {
        throw new Error("Canvas context not available.");
      }
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      const renderTask: RenderTask = page.render({
        canvasContext: context,
        viewport: viewport,
      });

      await renderTask.promise;

      return canvas.toDataURL();
    } catch (error) {
      dispatch(setField({ errorMessage: errors.FILE_CORRUPT.message }));
      console.log(error);
      return DEFAULT_PDF_IMAGE; // Return the placeholder image URL when an error occurs
    }
  }
}

export const getPlaceHoderImageUrl = (extension: string) => {
  switch (extension) {
    case ".docx":
      return "/images/word.png";
    case ".html":
      return "/images/html.png";
    case ".pptx":
      return "/images/powerpoint.png";
    case ".xlsx":
      return "/images/excel.png";
    default:
      return "images/pdf.png";
  }
};

// a function to check if the extension is .jpg or .pdf:
export const isDraggableExtension = (ext: string, router: NextRouter) => {
  return ext === ".jpg" || router.asPath.includes("merge-pdf");
};

export function isrtllang(asPath: string): boolean {
  return asPath.startsWith("/ar");
}

export const validateFiles = (
  _files: FileList | File[],
  extension: string,
  errors: _,
  dispatch: Dispatch<Action>,
  state: {
    path: string;
    click: boolean;
    focus: boolean;
  }
) => {
  const files = Array.from(_files); // convert FileList to File[] array

  let allowedMimeTypes = [
    "application/pdf",
    "text/html",
    "image/jpeg",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    "application/vnd.ms-powerpoint",
    "application/vnd.ms-excel",
  ];
  // validation for merge-pdf page & empty files
  if (state.path == "merge-pdf" && files.length <= 1) {
    dispatch(setField({ errorMessage: errors.ERR_UPLOAD_COUNT.message }));
    dispatch(setField({ errorCode: "ERR_UPLOAD_COUNT" }));
    return false;
  }
  if (files.length == 0 && (state.click || state.focus)) {
    dispatch(setField({ errorMessage: errors.NO_FILES_SELECTED.message }));
    dispatch(setField({ errorCode: "ERR_NO_FILES_SELECTED" }));
    return false;
  }
  const fileSizeLimit = 50 * 1024 * 1024; // 50 MB
  for (let i = 0; i < files.length; i++) {
    const file = files[i] || null;
    extension = extension.replace(".", "").toUpperCase();
    let file_extension = file.name.split(".").pop()?.toUpperCase() || "";
    // this contains all types and some special types that might potentially be of than one extension
    const types = [
      "ppt",
      "pptx",
      "doc",
      "docx",
      "xls",
      "xlsx",
      "html",
      "htm",
      "jpg",
      "pdf",
    ];

    if (!file || !file.name) {
      // handle FILE_CORRUPT error
      dispatch(setField({ errorMessage: errors.FILE_CORRUPT.message }));
      return false;
    } else if (!file.type) {
      // handle NOT_SUPPORTED_TYPE error
      dispatch(setField({ errorMessage: errors.NOT_SUPPORTED_TYPE.message }));
      return false;
    } else if (
      !allowedMimeTypes.includes(file.type) ||
      !types.includes(file_extension.toLowerCase())
    ) {
      const errorMessage =
        errors.NOT_SUPPORTED_TYPE.types[
          extension as keyof typeof errors.NOT_SUPPORTED_TYPE.types
        ] || errors.NOT_SUPPORTED_TYPE.message;
      dispatch(setField({ errorMessage: errorMessage }));
      return false;
    } else if (file.size > fileSizeLimit) {
      // handle FILE_TOO_LARGE error
      dispatch(setField({ errorMessage: errors.FILE_TOO_LARGE.message }));
      return false;
    } else if (!file.size) {
      // handle EMPTY_FILE error
      console.log("file.size", file.size);
      dispatch(setField({ errorMessage: errors.EMPTY_FILE.message }));
      dispatch(setField({ errorCode: "ERR_EMPTY_FILE" }));
      return false;
    } else if (file.type.startsWith("image/")) {
      // handle INVALID_IMAGE_DATA error
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const img = new Image();
        img.src = reader.result as string;
        img.onerror = () => {
          dispatch(
            setField({ errorMessage: errors.INVALID_IMAGE_DATA.message })
          );
          return false;
        };
      };
      return true;
    }
  }
  return true;
};

interface PDFFile extends Blob {
  name: string;
}

export async function calculatePages(file: PDFFile): Promise<number> {
  const reader = new FileReader();
  reader.readAsArrayBuffer(file);
  return new Promise<number>((resolve, reject) => {
    reader.onload = async (event) => {
      try {
        const typedArray = new Uint8Array(event.target?.result as ArrayBuffer);
        const pdf = await getDocument(typedArray).promise;
        resolve(pdf.numPages);
      } catch (error) {
        reject(error);
      }
    };
  });
}

/**
 * 
 * TypeError: pdfjsWorker.getDocument is not a function

Source
src/utils.ts (322:7) @ getDocument

  320 | return new Promise((resolve, reject) => {
  321 |   pdfjsWorker
> 322 |     .getDocument(path)
      |     ^
  323 |     .promise.then((document: any) => {
  324 |       resolve(document);
  325 |     })
 */
import type { PDFPageProxy } from "pdfjs-dist";
import { setField } from "./store";

export const createPDFPage = (
  document: PDFDocumentProxy,
  page: number
): Promise<PDFPageProxy> => {
  return new Promise((resolve, reject) => {
    if (!document || !page) return reject();
    document
      .getPage(page)
      .then((pageDocument: PDFPageProxy) => {
        resolve(pageDocument);
      })
      .catch((error: any) => reject(error));
  });
};

export const getPDFDocument = (source: string | Uint8Array) => {
  return getDocument(source).promise;
};
