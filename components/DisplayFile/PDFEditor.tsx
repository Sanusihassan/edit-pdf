/**
 great the pdf file is rendered as svg but the content is not editable i.e when clicking on any element on the svg the user can't edit it's content
 */

import { useEffect, useRef, useState } from "react";
import { getDocument, GlobalWorkerOptions, PDFDocumentProxy, SVGGraphics } from "pdfjs-dist";

import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";

GlobalWorkerOptions.workerSrc = pdfjsWorker;



export const PDFEditor = ({ pdf }: { pdf: File }) => {
  const svgContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const renderPDF = async () => {
      if (!pdf || !svgContainerRef.current) {
        return;
      }
      const reader = new FileReader();
      reader.onload = async (event: ProgressEvent<FileReader>) => {
        const typedArray = new Uint8Array(event.target.result as ArrayBuffer);
        const pdfDoc = await getDocument(typedArray).promise;
        renderPages(pdfDoc);
      };
      reader.readAsArrayBuffer(pdf);
    };

    const renderPages = async (pdfDoc: PDFDocumentProxy) => {
      for (let pageNum = 1; pageNum <= pdfDoc.numPages; pageNum++) {
        const page = await pdfDoc.getPage(pageNum);
        const viewport = page.getViewport({ scale: 1 });

        const opList = await page.getOperatorList();
        const svgGfx = new SVGGraphics(page.commonObjs, page.objs);
        const svg = await svgGfx.getSVG(opList, viewport);

        svgContainerRef.current!.appendChild(svg);
      }
    };

    renderPDF();
  }, [pdf]);

  return <div ref={svgContainerRef} />;
};
