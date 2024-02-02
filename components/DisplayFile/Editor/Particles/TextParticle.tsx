import React, { useRef } from "react";
import { Rnd } from "react-rnd";

interface TextParticleProps {
  x: number;
  y: number;
  setIsDragging: React.Dispatch<React.SetStateAction<boolean>>;
}

const TextParticle: React.FC<TextParticleProps> = ({ x, y, setIsDragging }) => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <Rnd
      default={{
        x: x,
        y: y,
        width: 200,
        height: 100,
      }}
      // onDragStop={(e, d) => {
      //   e.stopPropagation();
      //   setIsDragging(true);
      // }}
      onDrag={(e, d) => {
        e.stopPropagation();
        setIsDragging(true);
      }}
      onResizeStop={(e, direction, ref, delta, position) => {
        e.stopPropagation();
        setIsDragging(true);
      }}
      minWidth={100}
      minHeight={50}
      maxWidth={500}
      maxHeight={300}
      bounds="parent"
      className="text-particle"
    >
      <div
        className="text"
        contentEditable={true}
        tabIndex={-1}
        onClick={(e) => {
          e.stopPropagation();
        }}
        onFocus={(e) => {
          e.stopPropagation();
        }}
        onBlur={(e) => {
          setIsDragging(false);
        }}
      ></div>
    </Rnd>
  );
};

export default TextParticle;
