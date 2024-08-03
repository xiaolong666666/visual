export const _FABRIC_SWITCH_DIRECTIVE_ = "_fabric_switch_directive_";

export const _FABRIC_ADD_IMAGE_ = "_fabric_add_image_";

export const _FABRIC_SWITCH_IMAGE_DIRECTIVE_ =
  "_fabric_switch_image_directive_";

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

export const IMAGE_DIRECTIVE_MAPPER = {
  ERASER: "eraser",
  CROPPER: "cropper",
  FLIPX: "flipX",
  FLIPY: "flipY",
};

export const DIRECTIVE_MAPPER = {
  SELECTION: "selection",
  HAND: "hand",
  ...BRUSH_MAPPER,
  ...MAIN_MAPPER,
  ...STATIC_MAPPER,
  ...IMAGE_MAPPER,
};
