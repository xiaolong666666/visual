import React from "react";
import styled from "styled-components";
import SelectionHand from "./selection-hand";
import MainAction from "./main-action";
import SplitLine from "./split-line";
import { _SWITCH_DIRECTIVE_ } from "../../constants";
import SubMenu from "../submenu";

const ToolsBox = styled.footer`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  min-width: 600px;
  height: 80px;
  background-color: #fff;
  border-radius: 13px;
  box-shadow: 0 0 0 0.5px #00000033, 0px 0px 0.5px rgba(0, 0, 0, 0.18),
    0px 3px 8px rgba(0, 0, 0, 0.1), 0px 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.2s;
  z-index: 99;
`;

const Tools = ({ directive }) => {
  return (
    <ToolsBox>
      <SelectionHand directive={directive} />
      <SplitLine />
      <MainAction directive={directive} />
      <SubMenu directive={directive} />
    </ToolsBox>
  );
};

export default Tools;
