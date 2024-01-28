import React, { useEffect, useRef, useState } from "react";
import { useFileStore } from "@/src/file-store";
import axios from "axios";
import { disableEditing, enableEditing } from "@/src/WYSIWYG/enableEditing";
import { ToolState } from "@/src/store";
import { useSelector } from "react-redux";
import parse from "html-react-parser";
import { PageToolBar } from "./PageToolBar";

export const PDFEditingArea = () => {
  const { files, setEditor } = useFileStore();
  const editingAreaRef = useRef<HTMLDivElement>(null);
  // const [numPages, setNumPages] = useState(0);
  const currentTool = useSelector(
    (state: { tool: ToolState }) => state.tool.currentTool
  );

  const pdf = files[0];
  // const [html, setHtml] = useState("");
  const [headSection, setHeadSection] = useState<string | Element | Element[]>(
    ""
  );
  const [pagesWithToolbar, setPagesWithToolbar] = useState<
    string | Element | Element[]
  >("");
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
      const response = await axios.get("/Resume.html");
      // Convert the ArrayBuffer to a string using TextDecoder
      // const decoder = new TextDecoder("utf-8");
      // const htmlString = decoder.decode(response.data);

      // Set the HTML string in the state
      const parsedHtml: JSX.Element = parse(
        response.data as string
      ) as JSX.Element;
      if (parsedHtml.props) {
        const _headSection = parsedHtml.props.children.find(
          (child: JSX.Element) => child.type === "head"
        );
        // set the headSection
        setHeadSection(_headSection);
        const bodySection = parsedHtml.props.children.find(
          (child: JSX.Element) => child.type === "body"
        );
        if (bodySection.props.children) {
          const processedBodyContent = bodySection.props.children.map(
            (child: JSX.Element, index: number) => {
              if (child && child.props && child.props.className === "page") {
                return [
                  <PageToolBar pageNumber={index + 1} />,
                  <child.type
                    {...child.props}
                    onClick={() => {
                      console.log("clicked")
                    }}
                    onKeyUp={() => {
                      /* handle key up */
                    }}
                  />,
                ];
              } else {
                return child;
              }
            }
          );

          setPagesWithToolbar(processedBodyContent);
        }
      }
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
      <div
        className="wysiwyg-editor"
        // dangerouslySetInnerHTML={{
        //   __html: html,
        // }}
        ref={editingAreaRef}
      >
        {headSection !== null && pagesWithToolbar !== null ? (
          <>
            {headSection}
            {pagesWithToolbar}
          </>
        ) : null}
      </div>
    </section>
  );
};
