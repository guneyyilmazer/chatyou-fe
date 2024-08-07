import React from "react";

import { useRef } from "react";
import Cookies from "js-cookie";
import { API_BACKEND_SUFFIX, BACKEND_URL} from "..";

const Signup = () => {
  const toAPI = async () => {
    if (
      usernameRef.current?.value &&
      emailRef.current?.value &&
      passwordRef.current?.value
    ) {
      const res = await fetch(BACKEND_URL.concat(`${API_BACKEND_SUFFIX}/user/signup`), {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          username: usernameRef.current!.value,
          email: emailRef.current!.value,
          password: passwordRef.current!.value,
        }),
      });
      const response = await res.json();
      if (!response.error) {
        Cookies.set("Auth_Token", response.AuthValidation, { expires: 5 });
        window.location.replace("/");
      } else alert(response.error);
    } else alert("All credentials must be filled.");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toAPI();
  };
  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  return (
    <form
      className="form-group col-10 col-md-4 col-lg-3 d-flex flex-column"
      onSubmit={handleSubmit}
    >
      <h2 className="lead fs-1 text-white text-center">Signup</h2>
      <input
        type="text"
        ref={usernameRef}
        className="form-control mt-2"
        placeholder="Enter username"
        name=""
        id=""
      />
      <input
        type="email"
        ref={emailRef}
        className="form-control mt-2"
        placeholder="Enter email"
        name=""
        id=""
      />
      <input
        type="password"
        ref={passwordRef}
        className="form-control mt-2"
        placeholder="Enter password"
        name=""
        id=""
      />
      <div className="mt-3 text-center">
        <button className="btn btn-danger p-2" type="submit">
          Signup
        </button>
      </div>
    </form>
  );
};

export default Signup;
