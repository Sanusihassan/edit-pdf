import { useEffect, useRef, useState } from "react";
import { useFileStore } from "@/src/file-store";
import axios from "axios";
import {
  disableEditing,
  enableEditing,
} from "@/src/WYSIWYG/enableEditing";
import { ToolState } from "@/src/store";
import { useSelector } from "react-redux";

export const PDFEditingArea = () => {
  const { files, setEditor } = useFileStore();
  const editingAreaRef = useRef<HTMLDivElement>(null);
  // const [numPages, setNumPages] = useState(0);
  const currentTool = useSelector(
    (state: { tool: ToolState }) => state.tool.currentTool
  );
  
  const pdf = files[0];
  const [html, setHtml] = useState("");
  const editor = editingAreaRef.current;
  useEffect(() => {
    setEditor(editor);
    (async () => {
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append("files", files[i]);
      }
      // const response = await axios.post(
      //   "https://5000-sanusihassa-pdftohtmlco-ab7rnzkad6z.ws-eu107.gitpod.io/convert-to-html",
      //   formData,
      //   {
      //     responseType: "arraybuffer",
      //   }
      // );
      const response = await axios.get(
        "/Resume.html"
      );
      // Convert the ArrayBuffer to a string using TextDecoder
      // const decoder = new TextDecoder("utf-8");
      // const htmlString = decoder.decode(response.data);

      // Set the HTML string in the state
      setHtml(response.data);
      // WYSIWYGFunctionality(editor, currentTool);
      enableEditing(editor);
      return () => {
        // clean ups:
        disableEditing(editor);
          // if(activeTool) {
          //   activeTool.stop(editor)
          // }
      };
    })();
  }, [pdf, editingAreaRef.current, currentTool]);

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
