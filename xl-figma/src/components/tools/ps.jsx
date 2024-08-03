import React from "react";
import { Flex, Upload } from "antd";
import styled from "styled-components";
import Add from "@assets/tools-add.svg?react";
import { _FABRIC_ADD_IMAGE_, IMAGE_MAPPER } from "@constants";
import { onFabricSwitchDirective } from "@utils";

const { IMAGE } = IMAGE_MAPPER;

const ImageAction = styled.div`
  width: 100px;
  height: 100%;
  background-image: url(/assets/image.png);
  background-repeat: no-repeat;
  background-size: cover;
  border-top-right-radius: 13px;
  border-bottom-right-radius: 13px;
  cursor: pointer;
`;

const uploadProps = {
  name: "file",
  showUploadList: false,
  beforeUpload: (file) => {
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        _EE_.emit(_FABRIC_ADD_IMAGE_, e.target.result);
      };
    }
    return false;
  },
};

const Ps = ({ directive }) => {
  return (
    <>
      <ImageAction onClick={() => onFabricSwitchDirective(IMAGE, directive)} />
      <Flex align="center">
        <Upload {...uploadProps}>
          <Add width={48} height={40} style={{ cursor: "pointer" }} />
        </Upload>
      </Flex>
    </>
  );
};

export default Ps;
