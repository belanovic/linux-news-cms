import React, { useState, useCallback, useRef, useEffect } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import './style/image-cropper.css';
import Filter from './Filter';

function generateDownload(canvas, crop, setImgURL, setImgFile, setImgName) {
  if (!crop || !canvas) {
    return;
  }

  canvas.toBlob(
    async (blob) => {
      const previewUrl = window.URL.createObjectURL(blob);

      const file = new File([blob], "image.png");

      const fileName = Date.now() + '_' + file.name;
      const customURL = URL.createObjectURL(file);

      setImgURL(customURL);
      setImgName(fileName);
      setImgFile(file);


      /*  const anchor = document.createElement('a');
       anchor.download = 'cropPreview.png';
       anchor.href = URL.createObjectURL(blob);
       anchor.click();
 
       window.URL.revokeObjectURL(previewUrl); */
    },
    'image/png',
    1
  );
}

export default function ImgCropper({ setImgURL, setImgFile, setImgName, 
                            ratio, filterObj, setFilterObj, filterStyle, setFilterStyle }) {
  const [upImg, setUpImg] = useState();
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [crop, setCrop] = useState({ unit: '%', width: 30, aspect: ratio });
  const [completedCrop, setCompletedCrop] = useState(null);

  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => setUpImg(reader.result));
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onLoad = useCallback((img) => {
    imgRef.current = img;
  }, []);

  useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
      return;
    }

    const image = imgRef.current;
    const canvas = previewCanvasRef.current;
    const crop = completedCrop;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext('2d');
    const pixelRatio = window.devicePixelRatio;

    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = 'high';

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
  }, [completedCrop]);

  return (
    <div className="imgCropper">
      <div className="imgContainer">
        <ReactCrop
          src={upImg}
          onImageLoaded={onLoad}
          crop={crop}
          onChange={(c) => setCrop(c)}
          onComplete={(c) => setCompletedCrop(c)}
        />
        <div className="previewCanvas">
          <canvas
            ref={previewCanvasRef}
            style={{
              width: Math.round(completedCrop?.width ?? 0),
              height: Math.round(completedCrop?.height ?? 0)
            }}
          />
        </div>
      </div>
      <div className="buttons">
        <div className="inputImage">
          <input type="file" accept="image/*" onChange={onSelectFile} />
        </div>
        <div className="inputGeneric">
          <button
            onClick = {() =>{ 
              setImgURL('generic');
              setImgFile('');
              setImgName('generic');
            }}
          >Generička
          </button>
        </div>

        <i className="fas fa-cut crop-btn"
          type="button"
          disabled={!completedCrop?.width || !completedCrop?.height}
          onClick={() =>
            generateDownload(previewCanvasRef.current, completedCrop, setImgURL, setImgFile, setImgName)
          }
        >
        </i>
        <Filter 
          setImgURL = {setImgURL} 
          filterObj = {filterObj} 
          setFilterObj = {setFilterObj}
          filterStyle = {filterStyle}
          setFilterStyle = {setFilterStyle}
        />
      </div>
    </div>
  );
}
