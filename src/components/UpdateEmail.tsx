import { useRef, useState } from "react";
import Cookies from "js-cookie";
import { BACKEND_PORT, IP } from "..";
const UpdateProfilePicture = () => {
  const [error, setError] = useState<string>();
  const newEmailInput = useRef<HTMLInputElement>(null);

  const updateProfilePicture = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch(IP.concat(`${BACKEND_PORT}/verify`), {
      headers: {
        "Content-Type": "application/json",
      },

      method: "POST",
      body: JSON.stringify({ token: Cookies.get("Auth_Token") }),
    });
    const { userId } = await response.json();
    const res = await fetch(IP.concat(`${BACKEND_PORT}/user/updateEmail`), {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${Cookies.get("Auth_Token")}`,
      },
      method: "POST",
      body: JSON.stringify({
        userId,
        newEmail: newEmailInput.current!.value,
      }),
    });
    const data: { error?: string } = await res.json();
    if (data.error) setError(data.error);
  };

  return (
    <form
      className="form-group d-flex flex-column justify-content-center text-center align-items-center"
      onSubmit={updateProfilePicture}
    >
      <h2 className="lead my-2">Change Email</h2>

      <input
        type="text"
        ref={newEmailInput}
        className="form-control my-1"
        placeholder="Enter new email..."
      />
      <button className="btn btn-danger my-1" type="submit">
        Submit
      </button>
    </form>
  );
};

export default UpdateProfilePicture;
