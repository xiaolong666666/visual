import React from "react";
import styled from "styled-components";

const Eraser = styled.div`
  width: 64px;
  height: 96px;
  background: url("https://static.figma.com/uploads/73db92005c6f44c51579c75c42abbba8b471b4af") -82px -40px /
    356px 136px;
`;

const BrushEraser = () => {
  return <Eraser />;
};

export default BrushEraser;
