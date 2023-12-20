import { DraggableProvided, DraggableStateSnapshot } from "react-beautiful-dnd";
import { ActionDiv, ActionProps } from "./ActionDiv";
import { Tooltip } from "react-tooltip";
import type { errors as _ } from "../../content";
import { useEffect, useState } from "react";
import { Loader } from "./Loader";
import {
  getFileDetailsTooltipContent,
  getFirstPageAsImage,
  getPlaceHoderImageUrl,
} from "../../src/utils";
import { useDispatch } from "react-redux";
type OmitFileName<T extends ActionProps> = Omit<T, "fileName">;

type CardProps = OmitFileName<ActionProps> & {
  index: number;
  file: File;
  isDraggable: boolean;
  provided: DraggableProvided;
  snapshot: DraggableStateSnapshot;
  errors: _;
  loader_text: string;
  fileDetailProps: [string, string, string];
};

const FileCard = ({
  index,
  file,
  isDraggable,
  provided,
  errors,
  extension,
  loader_text,
  fileDetailProps,
}: CardProps) => {
  const [showLoader, setShowLoader] = useState(true);
  const [imageUrl, setImageUrl] = useState("");
  const [tooltipSize, setToolTipSize] = useState("");
  const dispatch = useDispatch();
  let isSubscribed = true;
  // if (true) {
  // } else {
  //   const sizeInBytes = file.size;
  //   let size: string = "";
  //   let isoCode = lang === "fr" ? "fr-FR" : lang == "" ? "en" : lang;
  //   size = new Intl.NumberFormat(isoCode, {
  //     notation: "compact",
  //     style: "unit",
  //     unit: "byte",
  //     unitDisplay: "narrow",
  //   }).format(sizeInBytes);
  //   let tooltipContent = size;
  // }
  // }
  useEffect(() => {
    (async () => {
      let size = await getFileDetailsTooltipContent(
        file,
        ...fileDetailProps,
        dispatch,
        errors
      );
      setToolTipSize(size);
    })();
    const processFile = async () => {
      try {
        setShowLoader(true);
        if (extension && extension === ".pdf") {
          if (isSubscribed) {
            setImageUrl(await getFirstPageAsImage(file, dispatch, errors));
          }
        } else if (extension && extension !== ".jpg") {
          console.log(fileDetailProps);
          if (isSubscribed) {
            setImageUrl(
              !file.size
                ? "/images/corrupted.png"
                : getPlaceHoderImageUrl(extension)
            );
          }
        }
      } catch (error) {
        console.error("Error processing files:", error);
      } finally {
        setShowLoader(false);
      }
    };
    processFile();
    return () => {
      isSubscribed = false;
    };
  }, [extension, file]);
  return (
    <div
      className="card item"
      data-tooltip-id={`item-tooltip-${index}`}
      data-tooltip-content={tooltipSize}
      data-tooltip-place="top"
      {...(isDraggable ? provided.dragHandleProps : {})}
    >
      {showLoader ? <Loader loader_text={loader_text} /> : null}
      <bdi>
        <Tooltip id={`item-tooltip-${index}`} />
      </bdi>
      <ActionDiv
        extension={extension}
        index={index}
        errors={errors}
        fileName={file.name}
      />
      <div className="card-body d-flex flex-column">
        {!showLoader ? (
          <img
            className="img-fluid-custom object-fit-contain rounded item-img"
            src={imageUrl}
            alt={`Selected file ${index}`}
            draggable={false}
          />
        ) : null}

        <p className="text-center">{file.name}</p>
      </div>
    </div>
  );
};

export default FileCard;
