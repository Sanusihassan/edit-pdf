// TextParticle.tsx:
// the text particles are not appearing exactly on the mouse position:
import React, { HTMLProps, useEffect, useRef } from "react";

interface TextParticleProps extends HTMLProps<HTMLDivElement> {
  x: number;
  y: number;
}

const TextParticle: React.FC<TextParticleProps> = ({ x, y, ...rest }) => {
  const textStyle: React.CSSProperties = {
    left: `${x}px`,
    top: `${y}px`,
  };

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
    console.log("mounted");
  }, [ref.current]);

  return (
    <div className="text text-particle" style={textStyle} {...rest}>
      <span ref={ref} contentEditable={true} />
    </div>
  );
};

export default TextParticle;
