import React, { useMemo } from "react";
import styled, { css } from "styled-components";
import { BRUSH_MAPPER, MAIN_MAPPER, IMAGE_MAPPER } from "@constants";
import Brush from "./brush";

const { PENCIL, LIGHT, TAPE, ERASER } = BRUSH_MAPPER;

const Container = styled.div`
  position: absolute;
  left: 44px;
  height: 48px;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-top-left-radius: 13px;
  border-top-right-radius: 13px;
  background-color: #f5f5f5;
  margin-top: -50px;
  z-index: -1;
  transition: transform, opacity 0.2s cubic-bezier(0.17, 0.53, 0.3, 1);
  display: none;
  ${({ $visible }) =>
    $visible &&
    css`
      display: inline-block;
    `}
`;

const SubMenu = ({ directive }) => {
  const submitMapper = Object.assign(
    {},
    BRUSH_MAPPER,
    MAIN_MAPPER,
    IMAGE_MAPPER
  );
  const submitList = Object.values(submitMapper);
  const visible = useMemo(() => submitList.includes(directive), [directive]);

  const getSubMenu = () => {
    switch (directive) {
      case PENCIL:
      case LIGHT:
      case TAPE:
      case ERASER:
        return <Brush directive={directive} />;
    }
    return null;
  };

  return <Container $visible={visible}>{getSubMenu()}</Container>;
};

export default SubMenu;
