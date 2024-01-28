import HighlightIcon from "@/components/icons/Highlighter";
import {
  CalendarDaysIcon,
  CheckIcon,
  PhotoIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { CgProfile } from "react-icons/cg";
import {
  FaEllipsisH,
  FaEraser,
  FaFeatherAlt,
  FaRegCircle,
} from "react-icons/fa";
import { PiTextboxLight } from "react-icons/pi";
import { RiText } from "react-icons/ri";
import { RxDrawingPin } from "react-icons/rx";
import { BtnStack } from "./BtnStack";
import ShapesIcon from "@/components/icons/ShapesIcon";
import { BtnStackDropDownMenu } from "./BtnStackDropDownMenu";
import { useState } from "react";

export const EditTools = () => {
  const [showShapeTools, setShowShapeTools] = useState(false);
  return (
    <div className="b tool-row">
      <BtnStack id="Text">
        Text
        <RiText />
      </BtnStack>
      <BtnStack id="Sign">
        Sign
        <FaFeatherAlt />
      </BtnStack>
      <BtnStack id="Initials">
        Initials
        <CgProfile />
      </BtnStack>
      <BtnStack id="Date">
        Date
        <CalendarDaysIcon className="icon" />
      </BtnStack>
      <div className="dropdown-menu-container">
        <BtnStack
          id="shapes"
          cb={() => {
            setShowShapeTools(!showShapeTools);
          }}
        >
          <ShapesIcon />
          Shapes
        </BtnStack>
        <BtnStackDropDownMenu
          className={`btn-stack-dropdown-menu${
            showShapeTools ? " visible" : ""
          }`}
        >
          <BtnStack id="Cross">
            Cross
            <XMarkIcon className="icon" />
          </BtnStack>
          <BtnStack id="Check">
            Check
            <CheckIcon className="icon" />
          </BtnStack>
          <BtnStack id="Circle">
            Circle
            <FaRegCircle />
          </BtnStack>
        </BtnStackDropDownMenu>
      </div>

      <BtnStack id="Image">
        Image
        <PhotoIcon className="icon" />
      </BtnStack>
      <BtnStack id="TBox">
        TBox
        <PiTextboxLight />
      </BtnStack>
      <BtnStack id="Sticky">
        Sticky
        <RxDrawingPin />
      </BtnStack>
      <BtnStack id="Erase">
        Erase
        <FaEraser />
      </BtnStack>
      <BtnStack id="Highlight">
        Highlight
        <HighlightIcon className="icon" />
      </BtnStack>
      <BtnStack id="Blackout">
        Blackout
        <HighlightIcon className="icon" color="black" />
      </BtnStack>
      <BtnStack id="Tools">
        Tools
        <FaEllipsisH />
      </BtnStack>
    </div>
  );
};
