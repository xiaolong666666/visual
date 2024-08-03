import { useState, useEffect, useRef } from "react";
import { BRUSH_MAPPER } from "@constants";
import { getBrush } from "@utils/brush";
import { getCursor } from "@utils/cursor";
import { useFabric, useFabricWithImage } from "@utils/hooks";
import "./index.css";

const Draw = ({ directive }) => {
  const canvasRef = useRef(null);
  const fabricRef = useFabric(canvasRef, directive);
  const [cursorClassName, setCursorClassName] = useState("cursor-select");

  useFabricWithImage(fabricRef.current);

  useEffect(() => {
    if (Object.values(BRUSH_MAPPER).includes(directive)) {
      fabricRef.current.isDrawingMode = true;
      fabricRef.current.freeDrawingBrush = getBrush(
        directive,
        fabricRef.current,
        {}
      );
    } else {
      fabricRef.current.isDrawingMode = false;
    }
    setCursorClassName(getCursor(directive));
  }, [directive]);

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
