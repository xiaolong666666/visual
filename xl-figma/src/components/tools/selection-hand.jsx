import React from "react";
import { Flex } from "antd";
import styled, { css } from "styled-components";
import SelectionSvg from "@assets/tools-selection.svg?react";
import HandSvg from "@assets/tools-hand.svg?react";
import { _SWITCH_DIRECTIVE_, DIRECTIVE_MAPPER } from "@constants";

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
  const onSwitchDirective = (v) => {
    if (directive !== v) {
      _EE_.emit(_SWITCH_DIRECTIVE_, v);
    }
  };

  return (
    <Flex vertical>
      <Box
        $current={directive === SELECTION}
        onClick={() => onSwitchDirective(SELECTION)}
      >
        <SelectionSvg width="44" height="40" />
      </Box>
      <Box
        $current={directive === HAND}
        onClick={() => onSwitchDirective(HAND)}
        className="hand"
      >
        <HandSvg width="44" height="40" />
      </Box>
    </Flex>
  );
};

export default SelectionHand;
