/**
 great the pdf file is rendered as svg but the content is not editable i.e when clicking on any element on the svg the user can't edit it's content
 */

// import { useEffect, useRef, useState } from "react";
// import { getDocument, GlobalWorkerOptions, PDFDocumentProxy, SVGGraphics } from "pdfjs-dist";

// import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";

// GlobalWorkerOptions.workerSrc = pdfjsWorker;

// export const PDFEditor = ({ pdf }: { pdf: File }) => {
//   const svgContainerRef = useRef<HTMLDivElement | null>(null);

//   useEffect(() => {
//     const renderPDF = async () => {
//       if (!pdf || !svgContainerRef.current) {
//         return;
//       }
//       const reader = new FileReader();
//       reader.onload = async (event: ProgressEvent<FileReader>) => {
//         const typedArray = new Uint8Array(event.target.result as ArrayBuffer);
//         const pdfDoc = await getDocument(typedArray).promise;
//         renderPages(pdfDoc);
//       };
//       reader.readAsArrayBuffer(pdf);
//     };

//     const renderPages = async (pdfDoc: PDFDocumentProxy) => {
//       for (let pageNum = 1; pageNum <= pdfDoc.numPages; pageNum++) {
//         const page = await pdfDoc.getPage(pageNum);
//         const viewport = page.getViewport({ scale: 1 });

//         const opList = await page.getOperatorList();
//         const svgGfx = new SVGGraphics(page.commonObjs, page.objs);
//         const svg = await svgGfx.getSVG(opList, viewport);

//         svgContainerRef.current!.appendChild(svg);
//       }
//     };

//     renderPDF();
//   }, [pdf]);

//   return <div ref={svgContainerRef} />;
// };

import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

export const addTextToPdf = async (
  pdf: File,
  text: string,
  x: number,
  y: number
) => {
  const existingPdfBytes = await pdf.arrayBuffer();

  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const pages = pdfDoc.getPages();
  const firstPage = pages[0];

  firstPage.drawText(text, {
    x,
    y,
    size: 50,
    font: helveticaFont,
    color: rgb(0.95, 0.1, 0.1),
  });

  const pdfBytes = await pdfDoc.save();
  return new File([pdfBytes], "new-document.pdf", {
    type: "application/pdf",
  });
};

import React, { useEffect, useRef } from "react";
// import WebViewer from "@pdftron/webviewer";

export const PDFEditor = ({ pdf }: { pdf: File }) => {
  const viewer = useRef(null);

  // if using a class, equivalent of componentDidMount
  useEffect(() => {
    if (pdf) {
      import("@pdftron/webviewer").then((WebViewer) => {
        console.log(WebViewer.default);
        WebViewer.default(
          {
            path: "/webviewer/lib", // path to the PDFTron 'lib' folder on your server
            initialDoc: URL.createObjectURL(pdf),
          },
          // @ts-ignore
          viewer?.current
        ).then((instance) => {
          // you can now call WebViewer APIs here...
        });
      });
    }
  }, [pdf]);

  return (
    <div
      style={{
        height: "100vh",
      }}
      className="webviewer"
      ref={viewer}
    ></div>
  );
};
