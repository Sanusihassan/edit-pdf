import TextParticle from "@/components/DisplayFile/Editor/Particles/TextParticle";



import React, { useState, useEffect, MouseEvent, useRef } from "react";
import { Stage, Layer, Text } from "react-konva";


interface TextParticleProps {
  x: number;
  y: number;
}

const App: React.FC = () => {
  const [innerWidth, setInnerWidth] = useState<number>(0);
  const [innerHeight, setInnerHeight] = useState<number>(0);
  const [textParticles, setTextParticles] = useState<TextParticleProps[]>([]);
  const stageRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setInnerWidth(window.innerWidth);
      setInnerHeight(window.innerHeight);
    };
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [stageRef.current]);

  const handleCanvasClick = (e: any) => {
    const stage = stageRef.current;
    if (stage) {
        // Property 'getPointerPosition' does not exist on type 'never'.ts(2339)
      const position = stage.getPointerPosition();
      if (position) {
        setTextParticles([...textParticles, { x: position.x, y: position.y }]);
      }
    }
  };

  return innerWidth > 0 && innerHeight > 0 ? (
    <Stage width={innerWidth} height={innerHeight} onClick={handleCanvasClick} ref={stageRef}>
      <Layer>
        <Text text="Click anywhere to add editable text" />
        {textParticles.map((particle, index) => (
          <TextParticle key={index} x={particle.x} y={particle.y} />
        ))}
      </Layer>
    </Stage>
  ) : null;
};

export default App;
