import { useSelector } from "react-redux";
import { ToolState } from "../src/store";
import { ExclamationCircleIcon } from "@heroicons/react/16/solid";

const ErrorElement = () => {
  // const dispatch = useDispatch();
  const showErrorMessage = useSelector(
    (state: { tool: ToolState }) => state.tool.showErrorMessage
  );

  const errorMessage = useSelector(
    (state: { tool: ToolState }) => state.tool.errorMessage
  );
  return (
    <>
      <div
        style={{
          display: showErrorMessage ? "block" : "none",
        }}
        className="error-element alert alert-danger text-center mt-3"
        role="alert"
      >
        <ExclamationCircleIcon
          className="w-5 h-5 hide-on-ltr"
          viewBox="0 0 22 22"
        />{" "}
        <bdi className="d-inline-flex">{errorMessage}</bdi>{" "}
        <ExclamationCircleIcon
          className="w-5 h-5 hide-on-rtl"
          viewBox="0 0 22 22"
        />
      </div>
    </>
  );
};

export default ErrorElement;
