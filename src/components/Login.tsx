import { useRef } from "react";
import Cookies from "js-cookie";
import {BACKEND_URL,API_BACKEND_SUFFIX} from '../index'
const Login = () => {
  const toAPI = async () => {
    if (usernameRef.current?.value && passwordRef.current?.value) {
      const res = await fetch(BACKEND_URL.concat(`${API_BACKEND_SUFFIX}/user/login`), {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          username: usernameRef.current!.value,
          password: passwordRef.current!.value,
        }),
      });
      const response = await res.json();
      if (!response.error) {
        Cookies.set("Auth_Token", response.AuthValidation, { expires: 5 });
        window.location.replace("/");
      } else {
        alert(response.error);
      }
    } else {
      alert("All credentials must be filled.");
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toAPI();
  };
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  return (
    <form
      onSubmit={handleSubmit}
      className="form-group col-10 col-md-4 col-lg-3 d-flex flex-column justify-content-center"
    >
      <h2 className="lead text-white text-center fs-1">Login</h2>
      <input
        type="text"
        ref={usernameRef}
        className="form-control mt-3 py-2"
        placeholder="Enter username"
        name=""
        id=""
      />
      <input
        type="password"
        ref={passwordRef}
        className="form-control mt-2 py-2"
        placeholder="Enter password"
        name=""
        id=""
      />
      <div className="mt-4 d-flex justify-content-center">
        <button className="btn btn-danger py-2" type="submit">
          Login
        </button>
      </div>
    </form>
  );
};

export default Login;
