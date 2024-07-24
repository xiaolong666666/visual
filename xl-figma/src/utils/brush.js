import * as fabric from "fabric";

export const getPencilBrush = (canvas) => {
  const brush = new fabric.PencilBrush(canvas);
  brush.width = 50;
  brush.color = "orange";
  return brush;
};

// export const getEraserBrush = (canvas) => {
//   const brush = new fabric.getEraserBrush(canvas);
//   brush.width = 50;
//   brush.color = "orange";
//   return brush;
// };

export const getCircleBrush = (canvas) => {
  const brush = new fabric.CircleBrush(canvas);
  brush.width = 50;
  brush.color = "orange";
  return brush;
};

export const getSprayBrush = (canvas) => {
  const brush = new fabric.SprayBrush(canvas);
  brush.width = 50;
  brush.color = "orange";
  return brush;
};

export const getPatternBrush = (canvas) => {
  const brush = new fabric.PatternBrush(canvas);
  brush.width = 50;
  brush.color = "orange";
  return brush;
};
