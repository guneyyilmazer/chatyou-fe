import { useState } from "react";
import "../css/ImagePreview.css"
const ImagePreview = ({
  images,
  setPreview,
  preview,
}: {
  images: string[];
  setPreview: any;
  preview: boolean;
}) => {
  const [index, setIndex] = useState(0);
  return (
    <div
      className="bg-dark position-absolute position-relative flex-column d-flex justify-content-center align-items-center top-0 start-0"
      style={{ width: "100vw", height: "100vh" }}
    >
      <img
        className="col-4"
        style={{ height: "600px", width: "500px" }}
        src={images[index]}
        alt=""
      />
      <div className="mt-3">
        {images.map((item, index) => (
          <img
            className="mx-1 images"
            
            onClick={() => setIndex(index)}
            style={{ height: "50px" ,cursor:"pointer"}}
            src={images[index]}
          />
        ))}
      </div>
      <button
        onClick={() => {
          setPreview(!preview);
        }}
        className="position-absolute p-3 px-4 top-0 end-0 btn btn-danger"
      >
        X
      </button>
    </div>
  );
};

export default ImagePreview;
