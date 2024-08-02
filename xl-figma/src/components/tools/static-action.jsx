import React from "react";
import { Flex } from "antd";
import styled, { css } from "styled-components";
import Text from "@assets/tools-text.svg?react";
import Section from "@assets/tools-section.svg?react";
import Table from "@assets/tools-table.svg?react";
import Stamp from "@assets/tools-stamp.svg?react";
import { STATIC_MAPPER } from "@constants";
import { onSwitchDirective } from "@utils";

const ActionBox = styled.div`
  width: 48px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 4px;
  cursor: pointer;
  svg {
    width: 48px;
    height: 40px;
  }
  &:hover {
    .mask {
      fill: #eee;
      background-color: #eee;
    }
  }
  ${({ $current }) =>
    $current &&
    css`
    svg.text,
    svg.section,
    svg.table,
    svg.stamp {
      fill: #9747ff;
    }
    svg.text rect {
      fill: #9747ff;
    }

    svg.text path[fill-rule="evenodd"][clip-rule="evenodd""],
    svg.table path,
    svg.stamp path {
      fill: white;
    }

    svg.section rect,
    svg.section path {
      fill: white;
    }
  `}
`;

const StaticAction = ({ directive }) => {
  const icons = [Text, Section, Table, Stamp];
  const list = Object.values(STATIC_MAPPER).map((v, i) => ({
    Icon: icons[i],
    staticValue: v,
    className: v,
  }));

  return (
    <Flex style={{ padding: "0 12px" }}>
      {list.map(({ Icon, staticValue, className }) => (
        <ActionBox
          key={staticValue}
          $current={directive === staticValue}
          onClick={() => onSwitchDirective(staticValue, directive)}
          className={className}
        >
          <Icon className="mask" />
        </ActionBox>
      ))}
    </Flex>
  );
};

export default StaticAction;
