import Logo from "pdfequips-navbar/icons/Logo";
import { FileInfoPanel } from "./Header/FileInfoPanel";
import FileManager from "./Header/FileManager";
export const Header = () => (
  <header className="header-tools">
    <nav className="header-tools-nav">
      <div className="logo-info-wrapper">
        <Logo />
        <FileInfoPanel />
      </div>
      <FileManager />
    </nav>
  </header>
);
