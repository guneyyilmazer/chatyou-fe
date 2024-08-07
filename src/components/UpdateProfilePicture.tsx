import { useState } from "react";
import Cookies from "js-cookie";
import getBase64 from "./GetBase64";
import { API_BACKEND_SUFFIX, BACKEND_URL} from "..";
const UpdateProfilePicture = () => {
  const [profilePicture, setProfilePicture] = useState<string>();
  const updateProfilePicture = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch(BACKEND_URL.concat(`${API_BACKEND_SUFFIX}/verify`), {
      headers: {
        "Content-Type": "application/json",
      },

      method: "POST",
      body: JSON.stringify({ token: Cookies.get("Auth_Token") }),
    });
    const { userId } = await response.json();
    const res = await fetch(BACKEND_URL.concat(`${API_BACKEND_SUFFIX}/user/updateProfilePicture`), {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${Cookies.get("Auth_Token")}`,
      },
      method: "POST",
      body: JSON.stringify({
        userId,
        profilePicture,
      }),
    });
    const data: { error?: string } = await res.json();
    if (data.error) alert(data.error);
    else window.location.reload();
  };

  return (
    <form
      className="form-group d-flex flex-column justify-content-center text-center align-items-center"
      onSubmit={updateProfilePicture}
    >
      <h2 className="lead my-2">UpdateProfilePicture</h2>

      <input
        type="file"
        className="form-control my-1"
        onChange={async (e) => {
          setProfilePicture(await getBase64(e.target.files![0]));
        }}
        placeholder="Upload"
      />
      <button className="btn btn-danger my-1" type="submit">
        Submit
      </button>
    </form>
  );
};

export default UpdateProfilePicture;
