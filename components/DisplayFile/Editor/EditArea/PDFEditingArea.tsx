import React, { useEffect, useRef, useState } from "react";
import { useFileStore } from "@/src/file-store";
import axios from "axios";
import { disableEditing, enableEditing } from "@/src/WYSIWYG/enableEditing";
import { ToolState } from "@/src/store";
import { useSelector } from "react-redux";
import parse from "html-react-parser";
import { PageToolBar } from "./PageToolBar";
import TextParticle from "../Particles/TextParticle";

export const PDFEditingArea = () => {
  const { files, setEditor, currentTool } = useFileStore();
  const editingAreaRef = useRef<HTMLDivElement>(null);
  const [particlePositions, setParticlePositions] = useState<
    { x: number; y: number }[]
  >([]);

  const currentToolName = useSelector(
    (state: { tool: ToolState }) => state.tool.currentTool
  );

  const pdf = files[0];
  // const [headSection, setHeadSection] = useState<string | Element | Element[]>(
  //   ""
  // );
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

        if (bodySection.props.children) {
          const processedBodyContent = bodySection.props.children.map(
            (child: JSX.Element, index: number) => {
              if (child && child.props && child.props.className === "page") {
                return (
                  <React.Fragment key={index}>
                    <PageToolBar pageNumber={index + 1} />
                    {particlePositions.map(({ x, y }, i) => (
                      <React.Fragment key={i}>
                        {currentToolName === "Text" && (
                          <TextParticle x={x} y={y} key={i} />
                        )}
                        {/* Add more cases for different tools as needed */}
                      </React.Fragment>
                    ))}
                    {React.cloneElement(child, {
                      ...child.props,
                      onClick: (e: MouseEvent) => {
                        if (currentToolName) {
                          const { clientX: x, clientY: y } = e;
                          setParticlePositions((prevPositions) => {
                            const newPosition = { x, y };
                            return [...prevPositions, newPosition];
                          });
                        }
                      },
                    })}
                  </React.Fragment>
                );
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
      };
    })();
  }, [pdf, editingAreaRef.current, currentToolName]);

  return (
    <section className="editing-area">
      <div className="wysiwyg-editor" ref={editingAreaRef}>
        {headContent !== null && pagesWithToolbar !== null ? (
          <>
            <style>{headContent}</style>
            {particlePositions.map(({ x, y }, i) => (
              <React.Fragment key={i}>
                {currentToolName === "Text" && (
                  <TextParticle x={x} y={y} key={i} />
                )}
                {/* Add more cases for different tools as needed */}
              </React.Fragment>
            ))}
            {pagesWithToolbar}
          </>
        ) : (
          <div>loading...</div>
        )}
      </div>
    </section>
  );
};
