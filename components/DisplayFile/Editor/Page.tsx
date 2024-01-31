// this is not working, let's use a canvas library that provide
import React, { useEffect, useRef, useState } from "react";
import TextParticle from "./Particles/TextParticle";
import { ToolState, toolType } from "@/src/store";
import { useSelector } from "react-redux";

export const Page = ({ child }: { child: JSX.Element }) => {
  const [particles, setParticles] = useState<{
    [key in toolType]: { x: number; y: number }[];
  }>([] as unknown as { [key in toolType]: { x: number; y: number }[] });
  const currentToolName = useSelector(
    (state: { tool: ToolState }) => state.tool.currentTool
  );
  const pageRef = useRef<HTMLDivElement>();

  const handlePageClick = (e: MouseEvent) => {
    console.log(e);
    // @ts-ignore
    const clientX = e.layerX ?? 0;
    // @ts-ignore
    const clientY = e.layerY ?? 0;

    // Check if the tool name already has particles, if not, initialize it
    if (currentToolName && particles !== null) {
      setParticles((prevParticles) => ({
        ...prevParticles,
        [currentToolName]: [
          ...(prevParticles[currentToolName] || []),
          { x: clientX, y: clientY },
        ],
      }));
    }
  };
  useEffect(() => {
    if (pageRef.current) {
      pageRef.current.addEventListener("click", handlePageClick);
    }
  }, [pageRef.current]);

  return (
    <div {...child.props} ref={pageRef}>
      {child.props.children}
      <div className="particle-container">
        {particles[currentToolName as toolType] &&
          particles[currentToolName as toolType].map(({ x, y }, index) => (
            <React.Fragment key={index}>
              {currentToolName === "Text" && <TextParticle x={x} y={y} />}
              {/* Add more cases for other tools if needed */}
            </React.Fragment>
          ))}
      </div>
    </div>
  );
};
