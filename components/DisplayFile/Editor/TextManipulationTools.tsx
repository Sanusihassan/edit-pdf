import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/outline";
import { SlMagnifier } from "react-icons/sl";

import { VscReplaceAll } from "react-icons/vsc";
import { BtnStack } from "./BtnStack";

export const TextManipulationTools = () => {
  return (
    <div className="c tool-row">
      <BtnStack id="Comment">
        Comment
        <ChatBubbleOvalLeftEllipsisIcon className="icon" />
      </BtnStack>
      <BtnStack id="Replace">
        Replace
        <VscReplaceAll />
      </BtnStack>
      <BtnStack id="Search">
        Search
        <SlMagnifier />
      </BtnStack>
    </div>
  );
};
