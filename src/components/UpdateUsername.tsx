import { useRef, useState } from "react";
import Cookies from "js-cookie";
import { API_BACKEND_SUFFIX, BACKEND_URL} from "..";
const UpdateProfilePicture = () => {
  const newUsernameInput = useRef<HTMLInputElement>(null);
  const updateProfilePicture = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch(BACKEND_URL.concat(`${API_BACKEND_SUFFIX}/verify`), {
      headers: {
        "Content-Type": "application/json",
      },

      method: "POST",
      body: JSON.stringify({ token: Cookies.get("Auth_Token") }),
    });
    const { username } = await response.json();
    if (
      newUsernameInput.current!.value.length >= 5 &&
      newUsernameInput.current!.value.length <= 20
    ) {
      const res = await fetch(BACKEND_URL.concat(`${API_BACKEND_SUFFIX}/user/updateUsername`), {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${Cookies.get("Auth_Token")}`,
        },
        method: "POST",
        body: JSON.stringify({
          username,
          newUsername: newUsernameInput.current!.value,
        }),
      });
      const data: { error?: string } = await res.json();
      if (data.error) alert(data.error);
    } else alert("Username must be between 5 and 20 characters");
  };

  return (
    <form
      className="form-group d-flex flex-column justify-content-center text-center align-items-center"
      onSubmit={updateProfilePicture}
    >
      <h2 className="lead my-2">Update Username</h2>

      <input
        type="text"
        ref={newUsernameInput}
        className="form-control my-1"
        placeholder="Enter new username..."
      />
      <button className="btn btn-danger my-1" type="submit">
        Submit
      </button>
    </form>
  );
};

export default UpdateProfilePicture;
