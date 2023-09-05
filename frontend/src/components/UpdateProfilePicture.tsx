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

  };
  
  return (
    <form onSubmit={updateProfilePicture}>
      UpdateProfilePicture
      <input
        type="file"
        onChange={async(e) => {
          const base64 = await getBase64(e.target.files![0]);
          setProfilePicture(base64 as string);
        }}
        placeholder="Upload"
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default UpdateProfilePicture;
