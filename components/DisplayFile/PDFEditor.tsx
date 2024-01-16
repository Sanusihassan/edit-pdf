import { PDFEditingArea } from "./Editor/EditArea/PDFEditingArea";
import { PageManager } from "./Editor/EditArea/PageManager";
import { Header } from "./Editor/Header";
import { Tools } from "./Editor/Tools";

export const PDFEditor = ({ pdf }: { pdf?: File }) => {
  return (
    <>
      <div className="pdfequips-pdf-editor">
        <Header />
        <Tools />
        <div className="edit-area">
          <PageManager />
          <PDFEditingArea />
        </div>
      </div>
    </>
  );
};
