import { useState, useEffect, useRef } from "react";
import { BRUSH_MAPPER } from "@constants";
import { getBrush } from "@utils/brush";
import { getCursor } from "@utils/cursor";
import "./index.css";

const Draw = ({ directive }) => {
  const canvasRef = useRef(null);
  const fabricCanvasRef = useRef(null);
  const [cursorClassName, setCursorClassName] = useState("cursor-select");

  useEffect(() => {
    const options = {
      isDrawingMode: true,
      width: window.innerWidth,
      height: window.innerHeight,
    };

    const fabricCanvas = new fabric.Canvas(canvasRef.current, options);

    // 设置画笔模式
    fabricCanvas.freeDrawingBrush = getBrush(directive, fabricCanvas);

    fabricCanvasRef.current = fabricCanvas;

    const resize = () => fabricCanvas.renderAll();

    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      fabricCanvasRef.current.dispose();
    };
  }, []);

  useEffect(() => {
    if (Object.values(BRUSH_MAPPER).includes(directive)) {
      fabricCanvasRef.current.isDrawingMode = true;
      fabricCanvasRef.current.freeDrawingBrush = getBrush(
        directive,
        fabricCanvasRef.current,
        {}
      );
    } else {
      fabricCanvasRef.current.isDrawingMode = false;
    }
    setCursorClassName(getCursor(directive));
  }, [fabricCanvasRef.current, directive]);

  return (
    <div className={cursorClassName}>
      <canvas
        ref={canvasRef}
        width="100vw"
        height="100vh"
        style={{ cursor: "unset" }}
      />
    </div>
  );
};

export default Draw;
