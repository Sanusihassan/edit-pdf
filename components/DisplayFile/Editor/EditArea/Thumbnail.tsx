// i want to render the entire page in the canvas i.e in the 132X150 but right now some content is clipped this is not what i want.
import React, { useEffect, useRef } from "react";
import {
  ChevronUpIcon,
  ChevronDownIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { FaEllipsisH } from "react-icons/fa";
import { getDocument, PDFDocumentProxy } from "pdfjs-dist";

interface ThumbnailProps {
  pdf: File;
  pageNumber: number;
}

export const Thumbnail: React.FC<ThumbnailProps> = ({ pdf, pageNumber }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const fileReader = new FileReader();

    fileReader.onload = async (event) => {
      try {
        const typedArray = new Uint8Array(event.target?.result as ArrayBuffer);
        const loadingTask = getDocument({ data: typedArray });
        const pdfDoc: PDFDocumentProxy = await loadingTask.promise;
        const page = await pdfDoc.getPage(pageNumber);

        const canvas = canvasRef.current;
        const context = canvas?.getContext("2d");
        if (context && canvas) {
          // Calculate scale based on canvas dimensions
          const scaleWidth =
            canvas.width / page.getViewport({ scale: 1 }).width;
          const scaleHeight =
            canvas.height / page.getViewport({ scale: 1 }).height;
          const scale = Math.min(scaleWidth, scaleHeight);

          const viewport = page.getViewport({ scale });

          // Set canvas dimensions based on viewport dimensions
          // canvas.width = viewport.width;
          // canvas.height = viewport.height;

          const renderContext = {
            canvasContext: context,
            viewport: viewport,
          };

          await page.render(renderContext).promise;
        }
      } catch (error) {
        console.error("Error loading PDF: ", error);
      }
    };

    fileReader.readAsArrayBuffer(pdf);
  }, [pdf, pageNumber]);

  return (
    <a className="thumbnail" href={`#page_${pageNumber - 1}`}>
      <span className="page-number">{pageNumber}</span>
      <canvas width={132} height={150} ref={canvasRef}></canvas>
      <div className="page-settings">
        <button className="move-up" disabled>
          <ChevronUpIcon className="icon" />
        </button>
        <button className="move-down">
          <ChevronDownIcon className="icon" />
        </button>
        <button className="delete">
          <TrashIcon className="icon" />
        </button>
        <button className="more">
          <FaEllipsisH className="icon" />
        </button>
      </div>
    </a>
  );
};
