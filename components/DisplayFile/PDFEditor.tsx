import { ToolState } from "@/src/store";
import { useSelector } from "react-redux";
import { PDFEditingArea } from "./Editor/EditArea/PDFEditingArea";
import { PageManager } from "./Editor/EditArea/PageManager";
import { Header } from "./Editor/Header";

export const PDFEditor = () => {
  const showPages = useSelector(
    (state: { tool: ToolState }) => state.tool.showPages
  );
  return (
    <>
      <div className="pdfequips-pdf-editor">
        <Header />
        <div className="edit-area">
          <PageManager />
          <div className={`gutter${showPages ? "" : " hide"}`}></div>
          <PDFEditingArea />
        </div>
      </div>
    </>
  );
};
