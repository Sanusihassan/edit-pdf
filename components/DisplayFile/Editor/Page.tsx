// i want to do the same here for this page component but only if The currentToolName == "Highlight"
// also the
import React, { useEffect, useRef, useState } from "react";
import TextParticle from "./Particles/TextParticle";
import { ToolState } from "@/src/store";
import { useSelector } from "react-redux";
import { KonvaParticles } from "./Particles/KonvaParticles";

export const Page = ({ child }: { child: JSX.Element }) => {
  const currentToolName = useSelector(
    (state: { tool: ToolState }) => state.tool.currentTool
  );
  const pageRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<JSX.Element[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    // Check if the click event is a result of dragging
    if (e.detail === 0 || isDragging) {
      return;
    }
    console.log(e.detail, isDragging);
    setIsDragging(false);

    // @ts-ignore
    const x = e.nativeEvent.layerX ?? 0;
    // @ts-ignore
    const y = e.nativeEvent.layerY ?? 0;

    // Create particle based on currentToolName
    let particle: JSX.Element | null = null;

    switch (currentToolName) {
      case "Text":
        particle = (
          <TextParticle
            key={Date.now()}
            x={x}
            y={y}
            setIsDragging={setIsDragging}
          />
        );
        break;
    }

    if (particle) {
      setParticles(
        (prevParticles) => [...prevParticles, particle] as JSX.Element[]
      );
    }
  };

  useEffect(() => {
    
  }, [currentToolName, isDragging, pageRef.current]);

  return (
    <div {...child.props}>
      {child.props.children}
      <KonvaParticles pageRef={pageRef} />
      <div className="particle-container" onClick={handleClick} tabIndex={0}>
        {particles.map((particle) => particle)}
      </div>
    </div>
  );
};
