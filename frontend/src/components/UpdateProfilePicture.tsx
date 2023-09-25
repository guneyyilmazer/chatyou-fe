import { useState } from "react";
import Cookies from "js-cookie";
import getBase64 from "./GetBase64";
const UpdateProfilePicture = () => {
  const [profilePicture, setProfilePicture] = useState<string>();
  const [error,setError] = useState<String>()
  type data = {
    error?:String
  }
  const updateProfilePicture = async (e:React.FormEvent) => {
    e.preventDefault()
    const response = await fetch("http://localhost:4000/verify", {
      headers: {
        "Content-Type": "application/json",
      },

      method: "POST",
      body: JSON.stringify({ token: Cookies.get("Auth_Token") }),
    });
    const {username} = await response.json()
    const res = await fetch("http://localhost:4000/user/updateProfilePicture", {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${Cookies.get("Auth_Token")}`,
      },
      method: "POST",
      body: JSON.stringify({
        username,
        profilePicture,
      }),
    });
    const data:data = await res.json();
    if(data.error) {setError(data.error as String)}
    window.location.reload()

  };
  
  return (
    <form className="form-group d-flex flex-column justify-content-center text-center align-items-center" onSubmit={updateProfilePicture}>
      <h2 className="lead my-2">
      UpdateProfilePicture
        </h2>
        
      <input
        type="file"
        className="form-control my-1"
        onChange={async(e) => {
          const base64 = await getBase64(e.target.files![0]);
          setProfilePicture(base64 as string);
        }}
        placeholder="Upload"
      />
      <button className="btn btn-danger my-1"  type="submit">Submit</button>
    </form>
  );
};

export default UpdateProfilePicture;
