import React, { useEffect, useRef } from "react";
import styled from "styled-components";

const DotBg = styled.div`
  overflow: hidden;
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: -1;
`;

const drawDotGrid = (canvas) => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
  const gridSpacing = 20;
  const dotRadius = 1;
  const dotColor = "rgba(0, 0, 0, 0.2)";
  const ctx = canvas.getContext("2d");

  for (let x = 0; x < width; x += gridSpacing) {
    for (let y = 0; y < height; y += gridSpacing) {
      ctx.beginPath();
      ctx.arc(x, y, dotRadius, 0, 2 * Math.PI, false);
      ctx.fillStyle = dotColor;
      ctx.fill();
      ctx.closePath();
    }
  }
};

const DotGrid = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    drawDotGrid(canvasRef.current);
  }, []);

  return (
    <DotBg>
      <canvas ref={canvasRef} />
    </DotBg>
  );
};

export default DotGrid;
