import { ToolState, setHeaderHeight } from "@/src/store";
import { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { HeaderTools } from "./HeaderTools";
import { Tools } from "./Tools";

export const Header = () => {
    const headerHeight = useSelector(
      (state: { tool: ToolState }) => state.tool.headerHeight
    );
    const headerRef = useRef<HTMLElement>(null);
    const dispatch = useDispatch();
    useEffect(() => {
      console.log("headerHeight", headerHeight);
      if (headerRef.current) {
        const headerHeight = headerRef.current.clientHeight;
        dispatch(setHeaderHeight(headerHeight));
        console.log(headerHeight);
       
      }
    }, [headerRef.current]);
    return(
  <header ref={headerRef}>
    <HeaderTools />
    <Tools />
  </header>
)};
