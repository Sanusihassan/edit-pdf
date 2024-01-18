// the render quality of the pdf is not good, what i want is height quality image maybe because we are using <canvas> is there another way to make it really high quality?
import { useEffect, useRef, useState } from "react";
import { getDocument, PDFDocumentProxy } from "pdfjs-dist";
import { useFileStore } from "@/src/file-store";
import axios from "axios";
import { PageToolBar } from "./PageToolBar";

export const PDFEditingArea = () => {
  const { files } = useFileStore();
  const editingAreaRef = useRef<HTMLElement>(null);
  const [numPages, setNumPages] = useState(0);
  const [html, setHtml] = useState("");

  const pdf = files[0];
  // useEffect(() => {
  //   const editingArea = editingAreaRef.current;

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
    })();
  }, [pdf]);

  return (
    <section className="editing-area" ref={editingAreaRef}>
      <PageToolBar pageNumber={numPages} />
      <iframe
        contentEditable
        srcDoc={html}
        style={{
          width: "100%",
          height: "100%",
        }}
      ></iframe>
    </section>
  );
};
