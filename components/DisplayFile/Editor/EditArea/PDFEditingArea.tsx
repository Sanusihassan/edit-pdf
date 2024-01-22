import { useEffect, useRef, useState } from "react";
import { getDocument, PDFDocumentProxy } from "pdfjs-dist";
import { useFileStore } from "@/src/file-store";

import { PageToolBar } from "./PageToolBar";
import axios from "axios";
import { initEditor } from "@/src/initEditor";

export const PDFEditingArea = () => {
  const { files } = useFileStore();
  const editingAreaRef = useRef<HTMLIFrameElement>(null);
  const [numPages, setNumPages] = useState(0);
  const pdf = files[0];
  const [html, setHtml] = useState("");
  // useEffect(() => {
  //   const editingArea = iframe;

  //   if (pdf && editingArea) {
  //     const fileReader = new FileReader();

  //     fileReader.onload = async (event) => {
  //       try {
  //         const typedArray = new Uint8Array(
  //           event.target?.result as ArrayBuffer
  //         );
  //         const loadingTask = getDocument({ data: typedArray });
  //         const pdfDoc: PDFDocumentProxy = await loadingTask.promise;
  //         setNumPages(pdfDoc.numPages);

  //         for (
  //           let pageNumber = 1;
  //           pageNumber <= pdfDoc.numPages;
  //           pageNumber++
  //         ) {
  //           const page = await pdfDoc.getPage(pageNumber);
  //           const viewport = page.getViewport({ scale: 1 });
  //           const scale = editingArea.clientWidth / viewport.width;
  //           const scaledViewport = page.getViewport({ scale });

  //           const canvas = document.createElement("canvas");
  //           canvas.width = editingArea.clientWidth;
  //           canvas.height = scaledViewport.height;
  //           const context = canvas.getContext("2d");

  //           if (context) {
  //             // Render the page into the canvas context
  //             const renderContext = {
  //               canvasContext: context,
  //               viewport: scaledViewport,
  //             };
  //             await page.render(renderContext).promise;

  //             // Append the canvas to the editing area
  //             editingArea.appendChild(canvas);
  //           }
  //         }
  //       } catch (error) {
  //         console.error("Error loading PDF: ", error);
  //       }
  //     };

  //     fileReader.readAsArrayBuffer(pdf);
  //   }
  // }, [pdf]);

  useEffect(() => {
    (async () => {
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append("files", files[i]);
      }
      const response = await axios.post(
        "https://8000-sanusihassa-pdfequipsap-7mfai37z239.ws-eu107.gitpod.io/api/pdf-to-html",
        formData,
        {
          responseType: "arraybuffer",
        }
      );
      // Convert the ArrayBuffer to a string using TextDecoder
      const decoder = new TextDecoder("utf-8");
      const htmlString = decoder.decode(response.data);

      // Set the HTML string in the state
      setHtml(htmlString);
      const iframe = editingAreaRef.current;
      initEditor(iframe);
    })();
  }, [pdf]);

  return (
    <section className="editing-area">
      {/* <PageToolBar pageNumber={pageNumber} /> */}
      <iframe
        srcDoc={html}
        ref={editingAreaRef}
        style={{ width: "100%", height: "100%" }}
      ></iframe>
    </section>
  );
};
