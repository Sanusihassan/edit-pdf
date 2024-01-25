import React, { useEffect, useRef, useState } from "react";
import { GrDocumentConfig } from "react-icons/gr";
import { Thumbnail } from "./Thumbnail";
import { useFileStore } from "@/src/file-store";
import { getDocument, PDFDocumentProxy } from "pdfjs-dist";
import { AddBlankPage } from "./AddBlankPage";
import { ToolState } from "@/src/store";
import { useSelector } from "react-redux";

export const PageManager = () => {
  const { files } = useFileStore();
  const [pageCount, setPageCount] = useState(0);
  const pageManagerRef = useRef<HTMLElement>(null);
  const headerHeight = useSelector(
    (state: { tool: ToolState }) => state.tool.headerHeight
  );
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

    function scrollHandler() {
      const pos = window.scrollY || window.pageYOffset;
      const el = pageManagerRef.current;
      if (el && headerHeight) {
        if (pos >= headerHeight) {
          el.style.top = "0";
        } else {
          el.style.top = `${headerHeight - pos}px`;
        }
      }
    }
    window.addEventListener("scroll", scrollHandler);
    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, [files, headerHeight]);

  return (
    <aside className="page-manager" ref={pageManagerRef}>
      <header>
        <div className="pages">Pages</div>
        <button className="re-arrange">
          <GrDocumentConfig />
        </button>
      </header>
      <section className="body">
        {[...Array(pageCount)].map((_, i) => (
          <div key={i + 1}>
            <Thumbnail pageNumber={i + 1} pdf={files[0]} />
            <AddBlankPage layout="manager" />
          </div>
        ))}
      </section>
    </aside>
  );
};
