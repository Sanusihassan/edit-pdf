import { useEffect, useRef, useState } from "react";
import { getDocument, PDFDocumentProxy } from "pdfjs-dist";
import { useFileStore } from "@/src/file-store";

import { PageToolBar } from "./PageToolBar";
import axios from "axios";
import { initEditor } from "@/src/initEditor";

export const PDFEditingArea = () => {
  const { files } = useFileStore();
  const editingAreaRef = useRef<HTMLDivElement>(null);
  // const [numPages, setNumPages] = useState(0);
  const pdf = files[0];
  const [html, setHtml] = useState("");

  useEffect(() => {
    (async () => {
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append("files", files[i]);
      }
      const response = await axios.post(
        "https://5000-sanusihassa-pdftohtmlco-ab7rnzkad6z.ws-eu107.gitpod.io/convert-to-html",
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
      {/* <iframe
        srcDoc={html}
        ref={editingAreaRef}
        style={{ width: "100%", height: "100%" }}
      ></iframe> */}
      <div
      className="wysiwyg-editor"
        dangerouslySetInnerHTML={{
          __html: html,
        }}
        ref={editingAreaRef}
      />
    </section>
  );
};
