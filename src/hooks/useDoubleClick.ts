import { useState, useRef, useEffect } from "react";

const useDoubleClick = (callback) => {
  const [ref, setRef] = useState(null);
  const countRef = useRef(0);
  const timerRef = useRef(null);

  const handler = (event) => {
    const isDoubleClick = countRef.current + 1 === 2;
    const timerIsPresent = timerRef.current;

    if (timerIsPresent && isDoubleClick) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
      countRef.current = 0;
      callback();
    } else if (!timerIsPresent) {
      countRef.current += 1;
      timerRef.current = setTimeout(() => {
        clearTimeout(timerRef.current);
        timerRef.current = null;
        countRef.current = 0;
      }, 200);
    }
  };

  useEffect(() => {
    if (ref) {
      ref.addEventListener("click", handler);
      return () => {
        ref.removeEventListener("click", handler);
      };
    }
  }, [ref]);

  return [setRef, ref];
};
