import React from "react";
import { Flex } from "antd";
import Brush from "./brush";
import Graph from "./graph";
import Node from "./node";

const MainAction = ({ directive }) => {
  return (
    <Flex style={{ padding: "0 12px" }}>
      <Brush directive={directive} />
      <Graph />
      <Node />
    </Flex>
  );
};

export default MainAction;
