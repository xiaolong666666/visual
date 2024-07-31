import React from "react";
import styled from "styled-components";

const TapeWrapper = styled.div`
  pointer-events: none;
  width: 72px;
  height: 80px;
  overflow: visible;
  background-image: url("https://static.figma.com/uploads/8ab86efd5632d61a014831faf1ed01df72ee88c4");
  background-position: -2px -8px;
  background-size: 72px 100.5px;
`;

const Tape = styled.div`
  position: absolute;
  width: 66px;
  height: 32px;
  top: 8px;
  left: 16px;
  overflow: visible;
  background-color: #d7d7d7;
  background-size: auto 100%;
  background-image: url("https://static.figma.com/uploads/089335580a69c785276a5ab39dd58fef8955279c");
  mask-image: url("https://static.figma.com/uploads/8fd9146eb6fddeb39bb39af0939f723729251625");
  transform: rotate(-90deg) translate(-100%);
  transform-origin: left top;
`;

const BrushTape = () => {
  return (
    <TapeWrapper>
      <Tape />
      <img
        src="https://static.figma.com/uploads/01cc9e62d5f9bfd4c8b72723f3a2c52b7d681a76"
        style={{ position: "absolute" }}
      />
    </TapeWrapper>
  );
};

export default BrushTape;
