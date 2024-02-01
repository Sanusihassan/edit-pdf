import React, { useRef } from "react";
import { useDrag } from "react-dnd";
import { Resizable } from "react-resizable";

interface TextParticleProps {
  x: number;
  y: number;
}

const TextParticle: React.FC<TextParticleProps> = ({ x, y }) => {
  const textStyle: React.CSSProperties = {
    left: `${x}px`,
    top: `${y}px`,
    position: "absolute",
  };

  const ref = useRef<HTMLDivElement>(null);
  const [, drag] = useDrag({
    type: "text-particle",
    item: { type: "text-particle", x, y },
  });

  return (
    <div
      key="text-particle"
      className="text text-particle"
      style={{ ...textStyle, cursor: "move" }}
      ref={(node) => drag(node)}
    >
      <Resizable
        width={200}
        height={100}
        minConstraints={[100, 50]}
        maxConstraints={[500, 300]}
      >
        <div
          contentEditable={true}
          onClick={(e) => {
            e.stopPropagation();
          }}
          onFocus={(e) => {
            e.stopPropagation();
          }}
          ref={ref}
        />
      </Resizable>
    </div>
  );
};

export default TextParticle;
