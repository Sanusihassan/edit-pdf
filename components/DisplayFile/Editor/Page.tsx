// i don't understand what index is really for?
import React, { useEffect, useState } from "react";
import TextParticle from "./Particles/TextParticle";
import { ToolState } from "@/src/store";
import { useSelector } from "react-redux";

interface PageParticleState {
  [key: number]: boolean;
}

export const Page = ({
  child,
  index,
}: {
  child: JSX.Element;
  index: number; // Add index as a prop
}) => {
  const [activePageParticle, setActivePageParticle] = useState<boolean>(false);
  const [particleCoords, setParticleCoords] = useState<
    {
      x: number;
      y: number;
    }[]
  >([]);
  const currentToolName = useSelector(
    (state: { tool: ToolState }) => state.tool.currentTool
  );

  useEffect(() => {}, [particleCoords, currentToolName]);

  const handlePageClick = (e: React.MouseEvent) => {
    const pageX = e.nativeEvent?.pageX ?? e.pageX ?? 0;
    const pageY = e.nativeEvent?.pageY ?? e.pageY ?? 0;
    console.log(e);
    if (currentToolName) {
      setParticleCoords([...particleCoords, { x: pageX, y: pageY }]);
    }
    setActivePageParticle(!activePageParticle);
  };

  return (
    <div {...child.props} onClick={(e: React.MouseEvent) => handlePageClick(e)}>
      {child.props.children}
      {particleCoords.map(({ x, y }) => {
        switch (currentToolName) {
          case "Text":
            return <TextParticle x={x} y={y} />;
        }
      })}
    </div>
  );
};
