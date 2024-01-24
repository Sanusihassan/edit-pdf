import Logo from "pdfequips-navbar/icons/Logo";
import { FileInfoPanel } from "./Header/FileInfoPanel";
import FileManager from "./Header/FileManager";
export const HeaderTools = () => {
  return (
    <section className="header-tools">
      <nav className="header-tools-nav">
        <div className="logo-info-wrapper">
          <a href="/" className="logo">
            <Logo />
          </a>
          <FileInfoPanel />
        </div>
        <FileManager />
      </nav>
    </section>
  );
};
