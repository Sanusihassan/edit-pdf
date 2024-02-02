import React, { useRef } from "react";
import { Rnd } from "react-rnd";

interface HighLightProps {
  x: number;
  y: number;
  width: number;
  height: number;
}

const HighLight: React.FC<HighLightProps> = ({ x, y, width, height }) => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <Rnd
      default={{
        x: x,
        y: y,
        width,
        height,
      }}
      bounds="parent"
      className="particle-wrapper"
    >
      <div contentEditable={false}
        className="highlight-box"
      ></div>
    </Rnd>
  );
};

export default HighLight;
