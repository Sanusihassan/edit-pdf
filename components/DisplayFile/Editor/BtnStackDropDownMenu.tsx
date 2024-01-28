import React from "react";

type BtnStackDropDownMenuProps = {
  children: React.ReactNode;
};
export const BtnStackDropDownMenu = ({ children, ...props }: BtnStackDropDownMenuProps & React.ComponentProps<"div">) => {
  return <div {...props}>{children}</div>;
};
