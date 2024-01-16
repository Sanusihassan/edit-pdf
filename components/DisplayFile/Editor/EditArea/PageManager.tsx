import { GrDocumentConfig } from "react-icons/gr";

export const PageManager = () => {
  return (
    <aside className="page-manager">
      <header>
        <div className="pages">Pages</div>
        <div className="re-arrange">
          <GrDocumentConfig />
        </div>
      </header>
    </aside>
  );
};
