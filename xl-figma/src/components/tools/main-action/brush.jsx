import React, { useState, useEffect } from "react";
import { Flex } from "antd";
import styled, { css } from "styled-components";
import { BRUSH_MAPPER } from "@constants";
import BrushPencil from "@assets/tools-brush-pencil.svg?react";
import BrushLight from "@assets/tools-brush-light.svg?react";
import BrushTape from "@assets/brush-tape";
import BrushEraser from "@assets/brush-eraser";
import { _SWITCH_DIRECTIVE_ } from "@constants";

const { PENCIL, LIGHT, TAPE, ERASER } = BRUSH_MAPPER;

const ActionBox = styled.div`
  position: relative;
  width: 72px;
  height: 80px;
  &:hover {
    background-color: #0000000f;
  }
  ${({ current }) =>
    current &&
    css`
      background-color: #0000000f;
    `}
`;

const BrushTarget = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  overflow: hidden;
  transition: all 1s;

  ${({ $directive }) => {
    switch ($directive) {
      case PENCIL:
        return css`
          & svg {
            width: 48px;
            height: 136px;
          }
        `;
      case LIGHT:
        return css`
          & svg {
            width: 72px;
            height: 136px;
          }
        `;
      default:
        return null;
    }
  }}

  ${({ isBrush }) =>
    isBrush &&
    css`
      &:hover {
        top: -34px;
        height: 114px;
      }
    `}
`;

const Brush = ({ directive }) => {
  const [currentBrush, setCurrentBrush] = useState(PENCIL);
  const [isBrush, setIsBrush] = useState(false);

  useEffect(() => {
    if (Object.values(BRUSH_MAPPER).includes(directive)) {
      setCurrentBrush(directive);
      setIsBrush(true);
    } else {
      setIsBrush(false);
    }
  }, [directive]);

  const onSwitchDirective = (v) => {
    if (directive !== v) {
      _EE_.emit(_SWITCH_DIRECTIVE_, v);
    }
  };

  const getBrushSvg = () => {
    switch (currentBrush) {
      case PENCIL:
        return <BrushPencil width="48" height="136" />;
      case LIGHT:
        return <BrushLight width="64" height="96" />;
      case TAPE:
        return <BrushTape />;
      case ERASER:
        return <BrushEraser />;
      default:
        return null;
    }
  };

  return (
    <Flex>
      <ActionBox>
        <BrushTarget
          $directive={directive}
          $isBrush={isBrush}
          onClick={() => onSwitchDirective(PENCIL)}
        >
          {getBrushSvg()}
        </BrushTarget>
      </ActionBox>
    </Flex>
  );
};

export default Brush;
