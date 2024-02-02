import { useEffect, useState } from "react";

export const KonvaParticles = ({
  pageRef,
}: {
  pageRef: React.RefObject<HTMLDivElement>;
}) => {
  const [dimentions, setDimentions] = useState<{ w: number; h: number }>({
    w: 0,
    h: 0,
  });
  useEffect(() => {
    if (pageRef.current) {
      const { clientWidth: w, clientHeight: h } = pageRef.current;
      setDimentions({
        w,
        h,
      });
    }
  }, [pageRef.current]);
  return <></>;
};
