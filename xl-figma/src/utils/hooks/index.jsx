import { useState, useEffect, useRef } from "react";
import {
  _FABRIC_SWITCH_DIRECTIVE_,
  _FABRIC_ADD_IMAGE_,
  _FABRIC_SWITCH_IMAGE_DIRECTIVE_,
  DIRECTIVE_MAPPER,
  IMAGE_DIRECTIVE_MAPPER,
} from "@constants";
import { getBrush } from "@utils/brush";

const { SELECTION } = DIRECTIVE_MAPPER;
const { ERASER, CROPPER, FLIPY, FLIPX } = IMAGE_DIRECTIVE_MAPPER;

export const useDirective = () => {
  const [directive, setDirective] = useState(SELECTION);

  useEffect(() => {
    _EE_.on(_FABRIC_SWITCH_DIRECTIVE_, setDirective);

    return () => {
      _EE_.off(_FABRIC_SWITCH_DIRECTIVE_);
    };
  }, []);

  return [directive, setDirective];
};

export const useFabric = (canvasRef, directive) => {
  const fabricRef = useRef(null);

  useEffect(() => {
    const options = {
      isDrawingMode: true,
      width: window.innerWidth,
      height: window.innerHeight,
    };

    const fabricCanvas = new fabric.Canvas(canvasRef.current, options);

    // 设置画笔模式
    fabricCanvas.freeDrawingBrush = getBrush(directive, fabricCanvas);
    fabricRef.current = fabricCanvas;

    return () => {
      fabricRef.current.dispose();
    };
  }, []);

  return fabricRef;
};

export const useFabricWithImage = (canvas) => {
  const [currentImage, setCurrentImage] = useState();
  let cropperRect;

  const addImage = (imageUrl) => {
    fabric.Image.fromURL(imageUrl, (img) => {
      // 等比缩放 60%
      const scale = 0.6;
      img.scale(scale);

      // 计算居中位置
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      img.set({
        left: centerX - (img.width * scale) / 2,
        top: centerY - (img.height * scale) / 2,
        originX: "left",
        originY: "top",
      });

      canvas.add(img);
      canvas.renderAll();
      setCurrentImage(img);
    });
  };

  const addCropperBox = () => {
    // 等比缩放 60%
    const scale = 0.6;

    // 计算居中位置
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // 添加裁剪框
    cropperRect = new fabric.Rect({
      left: centerX - (currentImage.width * scale) / 2,
      top: centerY - (currentImage.height * scale) / 2,
      width: currentImage.width * scale,
      height: currentImage.height * scale,
      fill: "rgba(0,0,0,0.3)",
      selectable: true,
      hasBorders: true,
      hasControls: true,
      borderColor: "orange",
      cornerColor: "orange",
    });

    canvas.add(cropperRect);
    canvas.setActiveObject(cropperRect);
  };

  const onCropperImage = () => {
    if (currentImage && cropperRect) {
      const { scaleX, scaleY } = currentImage;
      const { left, top, width, height } = cropperRect.getBoundingRect();
      const scaleLeft = (left - currentImage.left) / scaleX;
      const scaleTop = (top - currentImage.top) / scaleY;
      const scaleWidth = width / scaleX;
      const scaleHeight = height / scaleY;

      // 创建一个 canvas 画裁剪的图
      const cropperCanvas = document.createElement("canvas");
      cropperCanvas.width = scaleWidth;
      cropperCanvas.height = scaleHeight;
      const ctx = cropperCanvas.getContext("2d");

      ctx.drawImage(
        currentImage.getElement(),
        scaleLeft,
        scaleTop,
        scaleWidth,
        scaleHeight,
        0,
        0,
        scaleWidth,
        scaleHeight
      );

      const cropperDataUrl = cropperCanvas.toDataURL();

      fabric.Image.fromURL(cropperDataUrl, (cropperImg) => {
        // 计算居中位置
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        cropperImg.set({
          left: centerX - scaleWidth / 2,
          top: centerY - scaleHeight / 2,
          originX: "left",
          originY: "top",
        });

        canvas.remove(currentImage);
        canvas.remove(cropperRect);
        canvas.remove(cropperRect.mask);
        canvas.add(cropperImg);
        canvas.renderAll();
        setCurrentImage(cropperImg);
        window.removeEventListener("keydown", onHandleKeyDown);
      });
    }
  };

  const onHandleKeyDown = (e) => {
    if (e.key === "Enter") onCropperImage();
  };

  const excuteDirective = (directive) => {
    if (directive === ERASER) {
      canvas.isDrawingMode = true;
      canvas.freeDrawingBrush = getBrush(ERASER, canvas, {});
    } else {
      canvas.isDrawingMode = false;
      canvas.freeDrawingBrush = null;
    }
    if (directive === CROPPER) {
      if (currentImage) {
        addCropperBox();
        // 添加回车事件的监听
        window.addEventListener("keydown", onHandleKeyDown);
      }
    }
    if (directive === FLIPX || directive === FLIPY) {
      if (currentImage) {
        currentImage.set(directive, !currentImage[directive]);
        currentImage.setCoords();
        canvas.renderAll();
      }
    }
  };

  useEffect(() => {
    _EE_.on(_FABRIC_ADD_IMAGE_, addImage);
    _EE_.on(_FABRIC_SWITCH_IMAGE_DIRECTIVE_, excuteDirective);

    return () => {
      _EE_.off(_FABRIC_ADD_IMAGE_);
      _EE_.off(_FABRIC_SWITCH_IMAGE_DIRECTIVE_);
    };
  });
};
