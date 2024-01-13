import HighlightIcon from "@/components/icons/Highlighter";
import {
  CalendarDaysIcon,
  CheckIcon,
  PhotoIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { CgProfile } from "react-icons/cg";
import { FaEraser, FaFeatherAlt, FaRegCircle } from "react-icons/fa";
import { PiTextboxLight } from "react-icons/pi";
import { RiText } from "react-icons/ri";
import { RxDrawingPin } from "react-icons/rx";

export const EditTools = () => {
  return (
    <div className="b tool-row">
      <button className="btn-stack">
        Text
        <RiText />
      </button>
      <button className="btn-stack">
        Sign
        <FaFeatherAlt />
      </button>
      <button className="btn-stack">
        Initials
        <CgProfile />
      </button>
      <button className="btn-stack">
        Date
        <CalendarDaysIcon className="icon" />
      </button>
      <button className="btn-stack">
        Cross
        <XMarkIcon className="icon" />
      </button>
      <button className="btn-stack">
        Check
        <CheckIcon className="icon" />
      </button>
      <button className="btn-stack">
        Circle
        <FaRegCircle />
      </button>
      <button className="btn-stack">
        Image
        <PhotoIcon className="icon" />
      </button>
      <button className="btn-stack">
        Text Box
        <PiTextboxLight />
      </button>
      <button className="btn-stack">
        Sticky
        <RxDrawingPin />
      </button>
      <button className="btn-stack">
        Erase
        <FaEraser />
      </button>
      <button className="btn-stack">
        Highlight
        <HighlightIcon className="icon" />
      </button>
    </div>
  );
};
