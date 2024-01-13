import { Header } from "./Editor/Header";
import { Tools } from "./Editor/Tools";

export const PDFEditor = ({ pdf }: { pdf?: File }) => {
  return <>
    <div className="pdfequips-pdf-editor">
      <Header />
      <Tools />
    </div>
  </>;
};
