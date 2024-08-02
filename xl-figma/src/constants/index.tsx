export const _SWITCH_DIRECTIVE_ = "_switch_directive_";

export const BRUSH_MAPPER = {
  PENCIL: "pencil",
  LIGHT: "light",
  TAPE: "tape",
  ERASER: "eraser",
};

export const MAIN_MAPPER = {
  NOTE: "note",
  GRAPH: "graph",
};

export const STATIC_MAPPER = {
  TEXT: "text",
  SECTION: "section",
  TABLE: "table",
  STAMP: "stamp',",
};

export const IMAGE_MAPPER = {
  IMAGE: "image",
};

export const DIRECTIVE_MAPPER = {
  SELECTION: "selection",
  HAND: "hand",
  ...BRUSH_MAPPER,
  ...MAIN_MAPPER,
  ...STATIC_MAPPER,
  ...IMAGE_MAPPER,
};
