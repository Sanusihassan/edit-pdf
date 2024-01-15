import { ChevronUpIcon } from "@heroicons/react/24/outline";
import { CiSettings } from "react-icons/ci";
import { BtnStack } from "./BtnStack";

export const Settings = () => {
  return (
    <div className="d tool-row">
      <BtnStack id="Settings">
        Settings
        <CiSettings />
      </BtnStack>
      <BtnStack id="HideMenu">
        {/* hide menu */}
        <span>test</span>
        <ChevronUpIcon className="icon" />
      </BtnStack>
    </div>
  );
};
