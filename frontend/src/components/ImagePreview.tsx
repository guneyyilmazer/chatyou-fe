
const ImagePreview = ({image,setPreview}:{image:string,setPreview:any}) => {
  return (
    <div className="bg-dark position-relative d-flex justify-content-center align-items-center position-absolute top-0 start-0" style={{width:"100vw",height:"100vh"}}>
        <img className="col-4" src={image} alt="" />
<button onClick={setPreview(false)} className="position-absolute top-0 end-0 btn btn-danger">X</button>
    </div>
  )
}

export default ImagePreview