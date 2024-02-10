// now no particle is beign drawn:
import { ToolState } from "@/src/store";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Stage, Layer, Rect, Transformer } from "react-konva";
import React from "react";

export const KonvaParticles = ({
  pageRef,
}: {
  pageRef: React.RefObject<HTMLDivElement>;
}) => {
  const [dimensions, setDimensions] = useState<{ w: number; h: number }>({
    w: 0,
    h: 0,
  });

  const currentToolName = useSelector(
    (state: { tool: ToolState }) => state.tool.currentTool
  );

  const isDrawingRef = useRef(false);
  const startPositionRef = useRef({ x: 0, y: 0 });
  const [rectangles, setRectangles] = useState<
    { x: number; y: number; width: number; height: number; id: number }[]
  >([]);

  useEffect(() => {
    if (pageRef.current) {
      const { clientWidth: w, clientHeight: h } = pageRef.current;
      setDimensions({
        w,
        h,
      });
    }
  }, [pageRef.current, currentToolName]);

  const handleMouseDown = (e: any) => {
    if (currentToolName === "Highlight") {
      isDrawingRef.current = true;
      const { evt } = e;
      startPositionRef.current = { x: evt.pageX, y: evt.pageY };
      setRectangles([
        ...rectangles,
        {
          id: Date.now(),
          x: startPositionRef.current.x,
          y: startPositionRef.current.y,
          width: 0,
          height: 0,
        },
      ]);
    }
  };

  const handleMouseMove = (e: any) => {
    if (isDrawingRef.current) {
      const width = e.evt.clientX - startPositionRef.current.x;
      const height = e.evt.clientY - startPositionRef.current.y;

      setRectangles(
        rectangles.map((rect) => {
          if (rect.id === rectangles[rectangles.length - 1].id) {
            return { ...rect, width, height };
          }
          return rect;
        })
      );
    }
  };

  const handleMouseUp = () => {
    isDrawingRef.current = false;
  };

  return (
    <Stage
      width={dimensions.w}
      height={dimensions.h}
      className={`${currentToolName == "Highlight" ? "edit" : ""}`}
    >
      <Layer>
        <Rect
          width={dimensions.w}
          height={dimensions.h}
          fill="transparent"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        />
        {rectangles.map((rect, index) => (
          <React.Fragment key={index}>
            <Rect
              x={rect.x}
              y={rect.y}
              width={rect.width}
              height={rect.height}
              fill="rgba(255, 243, 192, .5)"
              draggable
            />
            <Transformer attachTo={[rectangles[index]]} />
          </React.Fragment>
        ))}
      </Layer>
    </Stage>
  );
};
