import React, { useRef, useState } from 'react';
import { Stage, Layer, Rect } from 'react-konva';

const DragAndHighlightKonva: React.FC = () => {
  const [selectionPosition, setSelectionPosition] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const isDraggingRef = useRef(false);
  const startPositionRef = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e: any) => {
    isDraggingRef.current = true;
    startPositionRef.current = { x: e.evt.clientX, y: e.evt.clientY };
  };

  const handleMouseMove = (e: any) => {
    if (isDraggingRef.current) {
      const width = e.evt.clientX - startPositionRef.current.x;
      const height = e.evt.clientY - startPositionRef.current.y;

      setSelectionPosition({
        x: startPositionRef.current.x,
        y: startPositionRef.current.y,
        width,
        height,
      });
    }
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  return (
    <Stage width={800} height={600}>
      <Layer>
        {/* Your page content goes here */}
        <Rect
          width={800}
          height={600}
          fill="white"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        />
        {selectionPosition.width > 0 && selectionPosition.height > 0 && (
          <Rect
            x={selectionPosition.x}
            y={selectionPosition.y}
            width={selectionPosition.width}
            height={selectionPosition.height}
            stroke="gold"
            strokeWidth={2}
            fill="rgba(155, 155, 0, 0.3)"
          />
        )}
      </Layer>
    </Stage>
  );
};

export default DragAndHighlightKonva;
