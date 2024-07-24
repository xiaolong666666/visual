import React from "react";
import { Flex, Button } from "antd";
import { EditOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { BRUSH_MAPPER } from "@constants";
import { pencil } from "./const";

const ToolsBox = styled.footer`
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
`;

const Tools = ({ setBrush }) => {
  const list = [
    {
      label: pencil,
      icon: <EditOutlined />,
      value: BRUSH_MAPPER.PENCIL,
    },
    {
      label: "圆刷",
      icon: <EditOutlined />,
      value: BRUSH_MAPPER.CIRCLE,
    },
    {
      label: "喷刷",
      icon: <EditOutlined />,
      value: BRUSH_MAPPER.SPRAY,
    },
    {
      label: "图刷",
      icon: <EditOutlined />,
      value: BRUSH_MAPPER.PATTERN,
    },
  ];
  return (
    <ToolsBox>
      <Flex gap="large">
        {list.map(({ label, icon, value }) => (
          <Button key={label} icon={icon} onClick={() => setBrush(value)}>
            {label}
          </Button>
        ))}
      </Flex>
    </ToolsBox>
  );
};

export default Tools;
