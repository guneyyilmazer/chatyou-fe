import { useState } from "react";
const ImagePreview = ({
  images,
  setPreview,
  preview,
}: {
  images: string[];
  setPreview: any;
  preview: boolean;
}) => {
  const [index, setIndex] = useState(1);
  return (
    <div
      className="bg-dark position-absolute position-relative flex-column d-flex justify-content-center align-items-center top-0 start-0"
      style={{ width: "100vw", height: "100vh" }}
    >
      <img
        className="col-4"
        style={{ height: "600px", width: "500px" }}
        src={images[index -1 ]}
        alt=""
      />
      <div className="mt-3">
        {images.map((item,index) => (
          <button className="btn btn-danger m-1" onClick={()=>setIndex(index+1)}>.</button>
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
