// TextParticle.tsx:
import React, { HTMLProps, useEffect, useRef, useState } from "react";

interface TextParticleProps extends HTMLProps<HTMLDivElement> {
  x: number;
  y: number;
  
}

const TextParticle: React.FC<TextParticleProps> = ({ x, y, ...rest }) => {
  

  const textStyle: React.CSSProperties = {
    left: `${x}px`,
    top: `${y}px`,
  };
  // const [textStyle, setTextStyle] = useState< React.CSSProperties>()

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      // ref.current.focus();
    }
  }, [ref.current]);

  return (
    <div className="text text-particle" style={textStyle} {...rest}>
      testing
      {/* <span ref={ref} contentEditable={true} /> */}
    </div>
  );
};

export default TextParticle;
