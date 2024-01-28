import { useEffect, useState } from "react";
import "react-tooltip/dist/react-tooltip.css";

import { useRouter } from "next/router";

import { validateFiles } from "../src/utils";

import type { errors as _, edit_page } from "../content";
import Files from "./DisplayFile/Files";
// import { ToolStoreContext } from "../src/ToolStoreContext";
import { useSelector, useDispatch } from "react-redux";
import { ToolState, resetErrorMessage, setField } from "../src/store";
import { useFileStore } from "../src/file-store";
import { PDFEditor } from "./DisplayFile/PDFEditor";
type propTypes = {
  extension: string;
  pages: string;
  page: string;
  lang: string;
  errors: _;
  edit_page: edit_page;
};

const DisplayFile = ({
  extension,
  pages,
  page,
  lang,
  errors,
  edit_page,
}: propTypes) => {
  const [showSpinner, setShowSpinner] = useState(true);
  const [toolTipSizes, setToolTipSizes] = useState<string[]>([]);
  // actual files
  const { files, setImageUrls } = useFileStore();
  // state variables:
  const statePath = useSelector(
    (state: { tool: ToolState }) => state.tool.path
  );
  const stateFocus = useSelector(
    (state: { tool: ToolState }) => state.tool.focus
  );
  const stateClick = useSelector(
    (state: { tool: ToolState }) => state.tool.click
  );
  const dispatch = useDispatch();
  // router
  const router = useRouter();
  let path = router.asPath.replace(/^\/[a-z]{2}\//, "").replace(/^\//, "");

  useEffect(() => {
    // set the path if it's not already set
    if (statePath == "" || statePath !== path) {
      dispatch(setField({ path }));
    }
    const isValid = validateFiles(files, extension, errors, dispatch, {
      path: statePath,
      focus: stateFocus,
      click: stateClick,
    });
    if (isValid) {
      dispatch(resetErrorMessage());
    }
    // const max_files = 2;
    // if (state && files.length > max_files) {
    //   state?.setErrorMessage(errors.MAX_FILES_EXCEEDED.message);
    // }
    let isSubscribed = true;
    // const tooltipSizes = files.map((file: File) =>
    //   getFileDetailsTooltipContent(file, pages, page, lang, dispatch, errors)
    // );
    // Promise.all(tooltipSizes).then((sizes) => {
    //   setToolTipSizes(sizes);
    // });

    // const processFiles = async () => {
    //   try {
    //     setShowSpinner(true);

    //     if (extension && extension === ".pdf") {
    //       const newImageUrls: { file: File; imageUrl: string }[] = [];
    //       const pdfPromises = files.map(async (file: File) => {
    //         const imageUrl = await getFirstPageAsImage(file, dispatch, errors);
    //         newImageUrls.push({ file, imageUrl });
    //       });

    //       await Promise.all(pdfPromises);
    //       if (isSubscribed) {
    //         setImageUrls([...newImageUrls]);
    //       }
    //     } else if (extension && extension !== ".jpg") {
    //       const newImageUrls: { file: File; imageUrl: string }[] = [];
    //       files.forEach((file: File) => {
    //         let imageUrl = !file.size
    //           ? "/images/corrupted.png"
    //           : getPlaceHoderImageUrl(extension);
    //         newImageUrls.push({ file, imageUrl });
    //       });

    //       if (isSubscribed) {
    //         setImageUrls([...newImageUrls]);
    //       }
    //     } else if (extension && extension === ".jpg") {
    //       const newImageUrls: { file: File; imageUrl: string }[] = [];
    //       files.forEach((file: File) => {
    //         const reader = new FileReader();
    //         reader.onload = function (event: ProgressEvent<FileReader>) {
    //           const imageUrl = (event.target as FileReader).result as string;
    //           newImageUrls.push({ file, imageUrl });
    //           if (isSubscribed) {
    //             setImageUrls([...newImageUrls]);
    //           }
    //         };
    //         reader.readAsDataURL(file);
    //       });
    //     }
    //   } catch (error) {
    //     console.error("Error processing files:", error);
    //   } finally {
    //     setShowSpinner(false);
    //   }
    // };

    // processFiles();

    return () => {
      isSubscribed = false;
    };
  }, [extension]);
  // const handleDragEnd = (result: any) => {
  //   if (!result.destination) {
  //     return;
  //   }
  // };

  return (
    <>
      {/* <Files
        errors={errors}
        extension={extension}
        setToolTipSizes={setToolTipSizes}
        toolTipSizes={toolTipSizes}
        loader_text={edit_page.loader_text}
        showSpinner={showSpinner}
        fileDetailProps={[pages, page, lang]}
      /> */}
      <PDFEditor />
    </>
  );
};

export default DisplayFile;
