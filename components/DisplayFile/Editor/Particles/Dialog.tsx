import React, { useRef } from "react";

const Dialog: React.FC = (props: React.ComponentProps<"section">) => {
  const dialogRef = useRef<HTMLElement>(null);

  const openDialog = () => {
    if (dialogRef.current) {
      dialogRef.current.classList.add("show");
    }
  };

  const closeDialog = () => {
    if (dialogRef.current) {
      dialogRef.current.classList.remove("show");
    }
  };

  return (
    <>
      <button
        type="button"
        className="launch-btn primary-btn"
        onClick={openDialog}
      >
        Launch demo modal
      </button>

      <section className="custom-dialog" ref={dialogRef} {...props} tabIndex={1}>
        <div className="custom-modal" id="exampleModal">
          <div className="custom-modal-dialog">
            <div className="custom-modal-content">
              <div className="custom-modal-header">
                <h5 className="custom-modal-title">Modal title</h5>
                <button
                  type="button"
                  className="close-btn"
                  aria-label="Close"
                  onClick={closeDialog}
                ></button>
              </div>
              <div className="custom-modal-body">{/* ... */}</div>
              <div className="custom-modal-footer">
                <button
                  type="button"
                  className="close-btn secondary-btn"
                  onClick={closeDialog}
                >
                  Close
                </button>
                <button type="button" className="save-btn primary-btn">
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Dialog;
