import React from "react";
import { Flex } from "antd";
import styled, { css } from "styled-components";
import GraphCircl from "@assets/tools-graph-1.svg?react";
import GraphRect from "@assets/tools-graph-2.svg?react";
import GraphTriangle from "@assets/tools-graph-3.svg?react";
import GraphArrow from "@assets/tools-graph-4.svg?react";
import { MAIN_MAPPER } from "@constants";
import { onFabricSwitchDirective } from "@utils";

const { GRAPH } = MAIN_MAPPER;

const ActionBox = styled.div`
  position: relative;
  width: 72px;
  height: 80px;
  padding: 0 12px;
  svg {
    width: 40px;
    height: 40px;
    &.graph-arrow {
      width: 31px;
      height: 34px;
    }
    &:hover {
      transform: scale(1.3);
    }
  }
  .box-inner {
    position: absolute;
    top: 7px;
  }
  &:hover {
    background-color: #0000000f;
    .box-inner {
      top: -7px;
    }
  }
  ${({ $current }) =>
    $current &&
    css`
      background-color: #0000000f;
    `}
`;

const Graph = ({ directive }) => {
  return (
    <ActionBox
      $current={directive === GRAPH}
      onClick={() => onFabricSwitchDirective(GRAPH, directive)}
    >
      <Flex vertical className="box-inner">
        <Flex align="base">
          <GraphCircl />
          <GraphRect />
        </Flex>
        <Flex align="base">
          <GraphTriangle />
          <GraphArrow className="graph-arrow" />
        </Flex>
      </Flex>
    </ActionBox>
  );
};

export default Graph;
