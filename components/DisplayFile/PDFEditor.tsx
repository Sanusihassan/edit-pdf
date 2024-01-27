import { PDFEditingArea } from "./Editor/EditArea/PDFEditingArea";
import { PageManager } from "./Editor/EditArea/PageManager";
import { Header } from "./Editor/Header";

export const PDFEditor = () => {
  return (
    <>
      <div className="pdfequips-pdf-editor">
        <Header />
        <div className="edit-area">
          <PageManager />
          <div className="gutter"></div>
          <PDFEditingArea />
        </div>
      </div>
    </>
  );
};
