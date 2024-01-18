import React, { useEffect, useState } from "react";
import { GrDocumentConfig } from "react-icons/gr";
import { Thumbnail } from "./Thumbnail";
import { useFileStore } from "@/src/file-store";
import { getDocument, PDFDocumentProxy } from "pdfjs-dist";
import { AddBlankPage } from "./AddBlankPage";

export const PageManager = () => {
  const { files } = useFileStore();
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    const pdf = files[0];
    if (pdf) {
      const fileReader = new FileReader();

      fileReader.onload = async (event) => {
        try {
          const typedArray = new Uint8Array(
            event.target?.result as ArrayBuffer
          );
          const loadingTask = getDocument({ data: typedArray });
          const pdfDoc: PDFDocumentProxy = await loadingTask.promise;
          setPageCount(pdfDoc.numPages); // Set the page count state
        } catch (error) {
          console.error("Error loading PDF: ", error);
        }
      };

      fileReader.readAsArrayBuffer(pdf);
    }
  }, [files]);

  return (
    <aside className="page-manager">
      <header>
        <div className="pages">Pages</div>
        <button className="re-arrange">
          <GrDocumentConfig />
        </button>
      </header>
      <section className="body">
        {[...Array(pageCount)].map((_, i) => (
          <>
            <Thumbnail key={i + 1} pageNumber={i + 1} pdf={files[0]} />
            <AddBlankPage layout="manager" />
          </>
        ))}
      </section>
    </aside>
  );
};
