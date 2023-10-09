export const getCropped = (image, crop, fileName, setResult) => {
  const canvas = document.createElement("canvas");
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  canvas.width = crop.width;
  canvas.height = crop.height;
  const ctx = canvas.getContext("2d");
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(
    image,
    crop.x * scaleX,
    crop.y * scaleY,
    crop.width * scaleX,
    crop.height * scaleY,
    0,
    0,
    crop.width,
    crop.height
  );
  // As Base64 string
  const base64Image = canvas.toDataURL("image/jpeg");
  canvas.toBlob(
    (blob) => {
      if (!blob) {
        //reject(new Error('Canvas is empty'));
        console.error("Canvas is empty");
        return;
      }
      //convert to base64
      let reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = function () {
        setResult((e) => reader.result);
      };
    },
    "image/jpeg",
    1
  );
};
