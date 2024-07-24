import { useState, useEffect, useRef } from "react";
import * as fabric from "fabric";
import { BRUSH_MAPPER } from "@constants";
import {
  getPencilBrush,
  getCircleBrush,
  getSprayBrush,
  getPatternBrush,
} from "@utils/brush";

const Draw = ({ brush }) => {
  const canvasRef = useRef(null);
  const fabricCanvasRef = useRef(null);
  // const [isErasing, setIsErasing] = useState(false);

  const getBrush = (fabricCanvas) => {
    switch (brush) {
      case BRUSH_MAPPER.PENCIL:
        return getPencilBrush(fabricCanvas);
      case BRUSH_MAPPER.CIRCLE:
        return getCircleBrush(fabricCanvas);
      case BRUSH_MAPPER.SPRAY:
        return getSprayBrush(fabricCanvas);
      case BRUSH_MAPPER.PATTERN:
        return getPatternBrush(fabricCanvas);
      default:
        return getPencilBrush(fabricCanvas);
    }
  };

  useEffect(() => {
    const options = {
      isDrawingMode: true,
      width: window.innerWidth,
      height: window.innerHeight,
    };

    const fabricCanvas = new fabric.Canvas(canvasRef.current, options);

    // 设置画笔模式
    fabricCanvas.freeDrawingBrush = getBrush(fabricCanvas);

    fabricCanvasRef.current = fabricCanvas;

    const resize = () => fabricCanvas.renderAll();

    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      fabricCanvasRef.current.dispose();
    };
  }, []);

  useEffect(() => {
    fabricCanvasRef.current.freeDrawingBrush = getBrush(
      fabricCanvasRef.current
    );
  }, [fabricCanvasRef.current, brush]);

  // useEffect(() => {
  //   if (fabricCanvasRef.current) {
  //     fabricCanvasRef.current.isDrawMode = !isErasing;
  //   }
  // }, [isErasing, fabricCanvasRef.current]);

  return <canvas ref={canvasRef} width="100vw" height="100vh" />;
};

export default Draw;
