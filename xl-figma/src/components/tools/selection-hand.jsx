import React from "react";
import { Flex } from "antd";
import styled, { css } from "styled-components";
import SelectionSvg from "@assets/tools-selection.svg?react";
import HandSvg from "@assets/tools-hand.svg?react";
import { DIRECTIVE_MAPPER } from "@constants";
import { onFabricSwitchDirective } from "@utils";

const { SELECTION, HAND } = DIRECTIVE_MAPPER;

const Box = styled.div`
  height: 40px;
  border-top-left-radius: 13px;
  &.hand {
    border-top-left-radius: 0;
    border-bottom-left-radius: 13px;
  }
  ${({ $current }) =>
    $current
      ? css`
          background-color: #9747ff;
          path {
            fill: #fff;
          }
        `
      : css`
          &:hover {
            background-color: #0000000f;
          }
        `}
`;

const SelectionHand = ({ directive }) => {
  return (
    <Flex vertical>
      <Box
        $current={directive === SELECTION}
        onClick={() => onFabricSwitchDirective(SELECTION, directive)}
      >
        <SelectionSvg width="44" height="40" />
      </Box>
      <Box
        $current={directive === HAND}
        onClick={() => onFabricSwitchDirective(HAND, directive)}
        className="hand"
      >
        <HandSvg width="44" height="40" />
      </Box>
    </Flex>
  );
};

export default SelectionHand;
