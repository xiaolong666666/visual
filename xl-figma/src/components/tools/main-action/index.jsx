import React from "react";
import { Flex } from "antd";
import Brush from "./brush";
import Graph from "./graph";
import Note from "./note";

const MainAction = ({ directive }) => {
  return (
    <Flex style={{ padding: "0 12px" }}>
      <Brush directive={directive} />
      <Note directive={directive} />
      <Graph directive={directive} />
    </Flex>
  );
};

export default MainAction;
