import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import "../css/ImagePreview.css";
const ImagePreview = ({
  images,
  setPreview,
  preview,
  previewPicturesIndex
}: {
  images: string[];
  setPreview: any;
  preview: boolean;
  previewPicturesIndex:number
}) => {
  const handleUserKeyPress = (event: KeyboardEvent) => {
    if (event.key == "Escape") {
      setPreview(!preview);
    }
  };
  useEffect(() => {
    window.addEventListener("keydown", handleUserKeyPress);
    return () => {
      window.removeEventListener("keydown", handleUserKeyPress);
    };
  }, [handleUserKeyPress]);

  const [index, setIndex] = useState(previewPicturesIndex);
  return (
    <div
      className="bg-dark position-absolute position-relative flex-column d-flex justify-content-center align-items-center top-0 start-0"
      style={{ width: "100vw", height: "100vh" }}
    >
      <img
        style={{ maxHeight: "600px", minHeight: "300px", maxWidth: "600px" }}
        src={images[index]}
        alt=""
      />
      <div className="mt-3">
        {images.map((item, index) => (
          <img
          key={index}
            className="mx-1 images"
            onClick={() => setIndex(index)}
            style={{ height: "50px", cursor: "pointer" }}
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
        <FontAwesomeIcon icon={faX}></FontAwesomeIcon>
      </button>
    </div>
  );
};

export default ImagePreview;
