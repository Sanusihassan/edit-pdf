import { PlusIcon } from "@heroicons/react/16/solid";

const AddBlankPageBtn = () => {
  return (
    <button>
      <PlusIcon className="icon" />
    </button>
  );
};

export const AddBlankPage = ({ layout }: { layout: "manager" | "editor" }) => {
  return (
    <div className="add-blank-page">
      {layout === "manager" ? (
        <>
          <div className="manager-add-blank-page">
            <div className="bar"></div>
            <AddBlankPageBtn />
            <div className="bar"></div>
          </div>
        </>
      ) : (
        <div className="editor-add-blank-page">
          <AddBlankPageBtn />
        </div>
      )}
    </div>
  );
};
