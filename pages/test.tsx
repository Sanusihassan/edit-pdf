import React, { useRef, useState } from "react";

const DragAndHighlightDiv: React.FC = () => {
  const [rectangles, setRectangles] = useState<
    Array<{ x: number; y: number; width: number; height: number }>
  >([]);
  const [selectionPosition, setSelectionPosition] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const isDraggingRef = useRef(false);
  const startPositionRef = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e: any) => {
    isDraggingRef.current = true;
    startPositionRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: any) => {
    if (isDraggingRef.current) {
      const width = e.clientX - startPositionRef.current.x;
      const height = e.clientY - startPositionRef.current.y;

      setSelectionPosition({
        x: startPositionRef.current.x,
        y: startPositionRef.current.y,
        width,
        height,
      });
    }
  };

  const handleMouseUp = () => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      setRectangles([...rectangles, selectionPosition]);
      setSelectionPosition({ x: 0, y: 0, width: 0, height: 0 });
    }
  };

  return (
    <>
      <div
        style={{ position: "relative", width: "800px", height: "600px" }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        {rectangles.map((rect, index) => (
          <div
            key={index}
            style={{
              position: "absolute",
              left: rect.x,
              top: rect.y,
              width: rect.width,
              height: rect.height,
              backgroundColor: "rgba(255, 243, 192, .5)",
              boxSizing: "border-box",
            }}
          ></div>
        ))}
        {selectionPosition.width > 0 && selectionPosition.height > 0 && (
          <div
            style={{
              position: "absolute",
              left: selectionPosition.x,
              top: selectionPosition.y,
              width: selectionPosition.width,
              height: selectionPosition.height,
              backgroundColor: "rgba(255, 243, 192, .5)",
              boxSizing: "border-box",
            }}
          ></div>
        )}
      </div>
    </>
  );
};

export default DragAndHighlightDiv;
