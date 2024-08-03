import React from "react";
import styled, { css } from "styled-components";
import Note1 from "@assets/tools-note-1.svg?react";
import Note2 from "@assets/tools-note-2.svg?react";
import Note3 from "@assets/tools-note-3.svg?react";
import { MAIN_MAPPER } from "@constants";
import { onFabricSwitchDirective } from "@utils";

const { NOTE } = MAIN_MAPPER;

const ActionBox = styled.div`
  position: relative;
  width: 116px;
  height: 80px;
  &:hover {
    background-color: #0000000f;
    .inner1 {
      top: -20px;
      height: 100px;
    }
  }
  ${({ $current }) =>
    $current &&
    css`
      background-color: #0000000f;
    `}
`;

const ActionBoxInner = styled.div`
  overflow: hidden;
  position: absolute;
  width: 116px;
  height: 80px;
`;

const NoteBox = styled.div`
  position: absolute;
  top: 16px;
  left: 25px;
  filter: drop-shadow(0px 1px 3px rgba(0, 0, 0, 0.1))
    drop-shadow(0px 3px 8px rgba(0, 0, 0, 0.1))
    drop-shadow(0px 0px 0.5px rgba(0, 0, 0, 0.18));
  transition: filter 0.1s;
  svg {
    width: 104px;
    height: 104px;
  }
  &.n1 {
    z-index: 3;
    transform: translate(-20px, -20px);
  }
  &.n2 {
    z-index: 2;
    transform: translate(-20px, -8px) rotate(-7.5deg);
    transform-origin: bottom left;
  }
  &.n3 {
    z-index: 1;
    transform: translate(-20px, 5px) rotate(-15deg);
    transform-origin: bottom left;
  }
`;

const Note = ({ directive }) => {
  return (
    <ActionBox
      $current={directive === NOTE}
      onClick={() => onFabricSwitchDirective(NOTE, directive)}
    >
      <ActionBoxInner className="inner1">
        <NoteBox className="n1">
          <Note1 />
        </NoteBox>
      </ActionBoxInner>
      <ActionBoxInner>
        <NoteBox className="n2">
          <Note2 />
        </NoteBox>
      </ActionBoxInner>
      <ActionBoxInner>
        <NoteBox className="n3">
          <Note3 />
        </NoteBox>
      </ActionBoxInner>
    </ActionBox>
  );
};

export default Note;
