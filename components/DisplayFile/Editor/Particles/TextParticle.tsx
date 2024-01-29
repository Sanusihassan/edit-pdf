import React, { HTMLProps, useEffect, useRef } from "react";

interface TextParticleProps extends HTMLProps<HTMLDivElement> {
  x: number;
  y: number;
}

const TextParticle: React.FC<TextParticleProps> = ({ x, y, ...rest }) => {
  const textStyle: React.CSSProperties = {
    position: "absolute",
    left: `${x}px`,
    top: `${y}px`,
    transform: "translate(-50%, -50%)", // Center the text around the clicked point
  };

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, [ref.current]);

  return (
    <div className="text" style={textStyle} contentEditable={true} {...rest} ref={ref} />
  );
};

export default TextParticle;
