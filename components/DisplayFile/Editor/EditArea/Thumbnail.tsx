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
  const desiredWidth = 132; // Set the desired width for the thumbnail
  const desiredHeight = 150; // Set the desired height for the thumbnail

  useEffect(() => {
    const fileReader = new FileReader();

    fileReader.onload = async (event) => {
      try {
        const typedArray = new Uint8Array(event.target?.result as ArrayBuffer);
        const loadingTask = getDocument({ data: typedArray });
        const pdfDoc: PDFDocumentProxy = await loadingTask.promise;
        const page = await pdfDoc.getPage(pageNumber);
        const viewport = page.getViewport({ scale: 1 });

        // Calculate the scale necessary to fit the page within the canvas dimensions
        const scaleX = desiredWidth / viewport.width;
        const scaleY = desiredHeight / viewport.height;
        const scale = Math.max(scaleX, scaleY); // We use Math.max to simulate "cover" behavior

        // Calculate the position to center the page within the canvas
        const offsetX = (desiredWidth - viewport.width * scale) / 2;
        const offsetY = (desiredHeight - viewport.height * scale) / 2;

        const canvas = canvasRef.current;
        const context = canvas?.getContext("2d");
        if (context && canvas) {
          canvas.width = desiredWidth;
          canvas.height = desiredHeight;

          // Clear the canvas in case of re-render
          context.clearRect(0, 0, desiredWidth, desiredHeight);

          // Set the transform to scale and translate the canvas context
          context.setTransform(scale, 0, 0, scale, offsetX, offsetY);

          const renderContext = {
            canvasContext: context,
            viewport: viewport,
          };

          await page.render(renderContext).promise;

          // Reset the transform to avoid affecting other canvas operations
          context.setTransform(1, 0, 0, 1, 0, 0);
        }
      } catch (error) {
        console.error("Error loading PDF: ", error);
      }
    };

    fileReader.readAsArrayBuffer(pdf);
  }, [pdf, pageNumber]);

  return (
    <div className="thumbnail">
      <span className="page-number">{pageNumber}</span>
      <canvas
        width={desiredWidth}
        height={desiredHeight}
        ref={canvasRef}
      ></canvas>
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
    </div>
  );
};
