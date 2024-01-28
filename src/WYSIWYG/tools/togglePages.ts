import { setField } from "@/src/store";
import { Action } from "@reduxjs/toolkit";
import { Dispatch } from "react";
import { BaseTool, Tool } from "./createTool";

type T = {
  showPages: boolean;
  dispatch: Dispatch<Action>;
};

class TogglePagesTool extends BaseTool implements Tool {
  execute({ showPages, dispatch }: T): void {
    console.log("command ran");
    if (this.el) {
      this.el.addEventListener("click", (e) =>
        togglePagesHandler(showPages, dispatch)
      );
    }
  }

  stop(): void {
    if (this.el) {
      this.el.removeEventListener("click", () => togglePagesHandler);
    }
  }
}

export const togglePagesTool = new TogglePagesTool();

const togglePagesHandler = (
  showPages?: boolean,
  dispatch?: Dispatch<Action>
) => {
  if (dispatch && showPages) {
    setField({ showPages: !showPages });
  }
};
