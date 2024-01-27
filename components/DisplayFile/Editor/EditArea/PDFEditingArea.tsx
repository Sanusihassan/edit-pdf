import { useEffect, useRef, useState } from "react";
import { useFileStore } from "@/src/file-store";
import axios from "axios";
import {
  WYSIWYGFunctionality,
  handleEdit,
} from "@/src/WYSIWYG/WYSIWYGFunctionality";
import { ToolState } from "@/src/store";
import { useSelector } from "react-redux";
import { createTool } from "@/src/WYSIWYG/tools/createTool";

export const PDFEditingArea = () => {
  const { files, activeTool, setActiveTool } = useFileStore();
  const editingAreaRef = useRef<HTMLDivElement>(null);
  // const [numPages, setNumPages] = useState(0);
  const currentTool = useSelector(
    (state: { tool: ToolState }) => state.tool.currentTool
  );
  
  const pdf = files[0];
  const [html, setHtml] = useState("");
  const editor = editingAreaRef.current;
  const tool = createTool(editor, setActiveTool);
  if (activeTool) {
    activeTool.stop(editor);
  }
  useEffect(() => {
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
      WYSIWYGFunctionality(editor, currentTool, tool);
      return () => {
        // clean ups:
        editor
          ?.querySelector(".page")
          ?.removeEventListener("mousemove", handleEdit);
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
