import React, { useEffect, useRef, useState } from "react";
import { useFileStore } from "@/src/file-store";
import axios from "axios";
import { disableEditing, enableEditing } from "@/src/WYSIWYG/enableEditing";
import parse from "html-react-parser";
import { PageToolBar } from "./PageToolBar";
import { Page } from "../Page";

export const PDFEditingArea = () => {
  const { files, setEditor } = useFileStore();
  const editingAreaRef = useRef<HTMLDivElement>(null);

  const pdf = files[0];
  const [headContent, setHeadContent] = useState<string | null>(null);
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
        setHeadContent(_headSection?.props.children);
        const bodySection = parsedHtml.props.children.find(
          (child: JSX.Element) => child.type === "body"
        );
        // the particle is not inserted here:
        if (bodySection.props.children) {
          const processedBodyContent = bodySection.props.children.map(
            (child: JSX.Element, index: number) => {
              if (child && child.props && child.props.className === "page") {
                return (
                  <React.Fragment key={index}>
                    <PageToolBar pageNumber={index} />
                    <Page child={child} />
                  </React.Fragment>
                );
              } else {
                return child;
              }
            }
          );

          // const pages = bodySection.props.children.map

          setPagesWithToolbar(processedBodyContent);
        }
      }
      // WYSIWYGFunctionality(editor, currentTool);
      enableEditing(editor);
      return () => {
        // clean ups:
        disableEditing(editor);
      };
    })();
  }, [pdf, editingAreaRef.current]);

  return (
    <section className="editing-area">
      <div className="wysiwyg-editor" ref={editingAreaRef}>
        {headContent !== null && pagesWithToolbar !== null ? (
          <>
            <style>{headContent}</style>
            {pagesWithToolbar}
          </>
        ) : (
          <div>loading...</div>
        )}
      </div>
    </section>
  );
};
