import Cropper from "cropperjs";
import "cropperjs/dist/cropper.css";
import "./index.css";

class CropperScreenshot {
  constructor(imageElement, options = {}) {
    this.cropper = null;
    this.imageElement = imageElement;
    this.imageRect = imageElement.getBoundingClientRect();
    this.onCropperEnd = options.onCropperEnd || function () {};
    this.onCropperCancel = options.onCropperCancel || function () {};
    this.createButtons();
    this.initializeCropper(imageElement);
  }

  initializeCropper(imageElement) {
    if (this.cropper) {
      this.cropper.replace(imageElement.src);
    } else {
      this.cropper = new Cropper(imageElement, {
        autoCrop: false,
        zoomable: false,
        movable: false,
        rotatable: false,
        scalable: false,
        viewMode: 1,
        zoomOnWheel: false,
        background: false,
        aspectRatio: null,
        cropend: () => {
          this.updateButtonsPosition();
        },
        cropmove: () => {
          this.hideButtons();
        },
        crop: () => {
          this.hideButtons();
        },
      });
    }
  }

  createButtons() {
    const buttonsContainer = document.createElement("div");
    buttonsContainer.classList.add("cropper_buttons");
    buttonsContainer.style.display = "none";

    const downloadBtn = document.createElement("div");
    downloadBtn.classList.add("cropper_button");
    downloadBtn.classList.add("download_button");
    downloadBtn.addEventListener("click", () => this.downloadCroppedImage());

    const cancelBtn = document.createElement("div");
    cancelBtn.classList.add("cropper_button");
    cancelBtn.classList.add("cancel_button");
    cancelBtn.addEventListener("click", () => this.cancelCrop());

    const recropBtn = document.createElement("div");
    recropBtn.classList.add("cropper_button");
    recropBtn.classList.add("recrop_button");
    recropBtn.addEventListener("click", () => this.recrop());

    const confirmBtn = document.createElement("div");
    confirmBtn.classList.add("cropper_button");
    confirmBtn.classList.add("confirm_button");
    confirmBtn.addEventListener("click", () => this.confirmCrop());

    buttonsContainer.appendChild(recropBtn);
    buttonsContainer.appendChild(downloadBtn);
    buttonsContainer.appendChild(cancelBtn);
    buttonsContainer.appendChild(confirmBtn);

    document.body.appendChild(buttonsContainer);

    this.buttonsContainer = buttonsContainer;
  }

  updateButtonsPosition() {
    const cropBoxData = this.cropper.getCropBoxData();
    const offsetX = this.imageRect.x;
    const offsetY = this.imageRect.y;
    const buttonsLen =
      this.buttonsContainer.getBoundingClientRect().width || 192;
    this.buttonsContainer.style.top = `${
      cropBoxData.top + cropBoxData.height + offsetY + 10
    }px`;
    this.buttonsContainer.style.left = `${
      cropBoxData.left + offsetX + cropBoxData.width - buttonsLen
    }px`;
    this.showButtons();
  }

  showButtons() {
    this.buttonsContainer.style.display = "flex";
  }

  hideButtons() {
    this.buttonsContainer.style.display = "none";
  }

  downloadCroppedImage() {
    const canvas = this.cropper.getCroppedCanvas();
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/jpeg");
    link.download = "cropped-image.jpeg";
    link.click();
  }

  cancelCrop() {
    this.onCropperCancel();
    this.destroy();
  }

  recrop() {
    this.cropper.clear();
    this.hideButtons();
  }

  confirmCrop() {
    const canvas = this.cropper.getCroppedCanvas();
    const croppedData = canvas.toDataURL("image/jpeg");
    this.onCropperEnd(croppedData);
    this.destroy();
  }

  destroy() {
    if (this.cropper) {
      this.cropper.destroy();
      this.cropper = null;
    }
    if (this.buttonsContainer) {
      this.buttonsContainer.remove();
      this.buttonsContainer = null;
    }
  }
}

export default CropperScreenshot;
