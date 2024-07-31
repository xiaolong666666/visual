import { DIRECTIVE_MAPPER } from "@constants";

const { SELECTION, HAND, PENCIL, LIGHT, TAPE, ERASER } = DIRECTIVE_MAPPER;

export const getCursor = (directive) => {
  let prefix = "reset-cursor";
  switch (directive) {
    case SELECTION:
      return prefix + " cursor-select";
    case HAND:
      return prefix + " cursor-hand";
    case PENCIL:
      return prefix + " cursor-pencil";
    case LIGHT:
      return prefix + " cursor-light";
    case TAPE:
      return prefix + " cursor-tape";
    case ERASER:
      return prefix + " cursor-eraser";
    default:
      return prefix;
  }
};
