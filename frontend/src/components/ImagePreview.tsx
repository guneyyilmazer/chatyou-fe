const ImagePreview = ({
  image,
  setPreview,
  preview,
}: {
  image: string;
  setPreview: any;
  preview: boolean;
}) => {
  return (
    <div
      className="bg-dark position-absolute position-relative d-flex justify-content-center align-items-center top-0 start-0"
      style={{ width: "100vw", height: "100vh" }}
    >
      <img className="col-4" src={image} alt="" />
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
