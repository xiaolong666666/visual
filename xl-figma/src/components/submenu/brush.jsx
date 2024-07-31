import React from "react";
import styled, { css } from "styled-components";
import BrushPencil from "@assets/tools-brush-pencil.svg?react";
import BrushLight from "@assets/tools-brush-light.svg?react";
import BrushTape from "@assets/brush-tape";
import BrushEraser from "@assets/brush-eraser";
import { _SWITCH_DIRECTIVE_, BRUSH_MAPPER } from "@constants";

const { PENCIL, LIGHT, TAPE, ERASER } = BRUSH_MAPPER;

const FlexBox = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const FlexItem = styled.div`
  position: relative;
  width: 64px;
`;

const ButtonBox = styled.div`
  position: absolute;
  overflow: hidden;
  width: 64px;
  height: 48px;
  z-index: -1;
  & svg {
    width: 64px;
    height: 96px;
  }
  ${({ $current }) =>
    $current
      ? css`
          top: -24px;
          height: 72px;
        `
      : css`
          &:hover {
            top: -24px;
            height: 72px;
          }
        `}
`;

const Brush = ({ directive }) => {
  const brushList = [
    {
      Icon: BrushPencil,
      value: PENCIL,
    },
    {
      Icon: BrushLight,
      value: LIGHT,
    },
    {
      Icon: BrushTape,
      value: TAPE,
    },
    {
      Icon: BrushEraser,
      value: ERASER,
    },
  ];

  const onSwitchDirective = (v) => {
    if (directive !== v) {
      _EE_.emit(_SWITCH_DIRECTIVE_, v);
    }
  };
  return (
    <FlexBox>
      {brushList.map(({ Icon, value }) => (
        <FlexItem key={value}>
          <ButtonBox
            $current={directive === value}
            onClick={() => onSwitchDirective(value)}
          >
            <Icon />
          </ButtonBox>
        </FlexItem>
      ))}
    </FlexBox>
  );
};

export default Brush;
