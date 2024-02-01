import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import TextParticle from "./Particles/TextParticle";
// Import other particle components as needed
import { ToolState, toolType } from "@/src/store";
import { useSelector } from "react-redux";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export const Page = ({ child }: { child: JSX.Element }) => {
  const currentToolName = useSelector(
    (state: { tool: ToolState }) => state.tool.currentTool
  );
  const particlesContainerRef = useRef<HTMLDivElement>(null);

  const [particles, setParticles] = useState<JSX.Element[]>([]);

  const handleClick = (e: MouseEvent) => {
    // Check if the click event is a result of dragging
    if (e.detail === 0) {
      return;
    }

    // @ts-ignore
    const x = e.layerX ?? 0;
    // @ts-ignore
    const y = e.layerY ?? 0;

    // Create particle based on currentToolName
    let particle: JSX.Element | null = null;

    switch (currentToolName) {
      case "Text":
        particle = <TextParticle key={Date.now()} x={x} y={y} />;
        break;
      // Add cases for other particle types as needed
      // case "Circle":
      //   particle = <CircleParticle key={Date.now()} x={x} y={y} />;
      //   break;
      // case "Square":
      //   particle = <SquareParticle key={Date.now()} x={x} y={y} />;
      //   break;
      default:
        break;
    }

    if (particle) {
      setParticles(
        (prevParticles) => [...prevParticles, particle] as JSX.Element[]
      );
    }
  };

  useEffect(() => {
    if (particlesContainerRef.current) {
      particlesContainerRef.current.addEventListener("click", handleClick);
    }

    return () => {
      if (particlesContainerRef.current) {
        particlesContainerRef.current.removeEventListener("click", handleClick);
      }
    };
  }, [currentToolName]);

  return (
    <div {...child.props}>
      {child.props.children}
      <DndProvider backend={HTML5Backend}>
        <div className="particle-container" ref={particlesContainerRef}>
          {particles.map((particle) => particle)}
        </div>
      </DndProvider>
    </div>
  );
};
