import { setField } from "@/src/store";
import { useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { HeaderTools } from "./HeaderTools";
import { Tools } from "./Tools";

export const Header = () => {
    const headerRef = useRef<HTMLElement>(null);
    const dispatch = useDispatch();
    useEffect(() => {
      if (headerRef.current) {
        const headerHeight = headerRef.current.clientHeight;
        dispatch(setField({ headerHeight }));
      }
    }, [headerRef.current]);
    return(
  <header ref={headerRef}>
    <HeaderTools />
    <Tools />
  </header>
)};
