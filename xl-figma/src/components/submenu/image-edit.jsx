import React from "react";
import { Flex } from "antd";
import styled, { css } from "styled-components";
import Eraser from "@assets/image-edit-eraser.svg?react";
import Cropper from "@assets/image-edit-cropper.svg?react";
import MirrorHorizontal from "@assets/image-edit-mirror-horizontal.svg?react";
import MirrorVertical from "@assets/image-edit-mirror-vertical.svg?react";
import { IMAGE_DIRECTIVE_MAPPER } from "@constants";
import { onFabricSwitchImageDirective } from "@utils";

const { ERASER, CROPPER, FLIPY, FLIPX } = IMAGE_DIRECTIVE_MAPPER;

const ButtonBox = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  cursor: pointer;
  & svg {
    width: 28px;
    height: 28px;
  }
`;

const ImageEdit = ({ directive }) => {
  const imageEditList = [
    {
      Icon: Eraser,
      value: ERASER,
    },
    {
      Icon: Cropper,
      value: CROPPER,
    },
    {
      Icon: MirrorHorizontal,
      value: FLIPX,
    },
    {
      Icon: MirrorVertical,
      value: FLIPY,
    },
  ];

  return (
    <Flex gap="large" style={{ height: "100%", padding: "0 20px" }}>
      {imageEditList.map(({ Icon, value }) => (
        <ButtonBox
          key={value}
          $current={directive === value}
          onClick={() => onFabricSwitchImageDirective(value, directive)}
        >
          <Icon />
        </ButtonBox>
      ))}
    </Flex>
  );
};

export default ImageEdit;
