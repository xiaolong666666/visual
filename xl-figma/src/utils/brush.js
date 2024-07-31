import { BRUSH_MAPPER } from "@constants";

const { PENCIL, LIGHT, TAPE, ERASER } = BRUSH_MAPPER;

export const getPencilBrush = (canvas, opt) => {
  const conf = opt ?? { width: 2, color: "orange" };
  const brush = new fabric.PencilBrush(canvas);
  brush.width = conf.width || 2;
  brush.color = conf.color || "orange";
  return brush;
};

export const getLightBrush = (canvas, opt) => {
  const conf = opt ?? { width: 30, color: "orange" };
  const brush = new fabric.PencilBrush(canvas);
  brush.width = conf.width || 30;
  brush.color = conf.color || "orange";
  brush.strokeLineCap = conf.strokeLineCap || "square";
  brush.strokeLineJoin = conf.strokeLineJoin || "round";
  brush.opacity = conf.opacity || 0.3; // 调整透明度，模拟高亮效果
  return brush;
};

export const getEraserBrush = (canvas) => {
  const brush = new fabric.EraserBrush(canvas);
  brush.width = 30;
  return brush;
};

export const getBrush = (directive, fabricCanvas) => {
  switch (directive) {
    case PENCIL:
      return getPencilBrush(fabricCanvas);
    case LIGHT:
      return getLightBrush(fabricCanvas);
    // case TAPE:
    //   return getSprayBrush(fabricCanvas);
    case ERASER:
      return getEraserBrush(fabricCanvas);
    default:
      return getPencilBrush(fabricCanvas);
  }
};
