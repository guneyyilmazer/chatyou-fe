import Login from "../components/Login";
import Signup from "../components/Signup";
import { useState } from "react";
import Cookies from "js-cookie";
import { BACKEND_URL, API_BACKEND_SUFFIX } from "../index";

const AuthPage = () => {
  const [haveAnAccount, setHaveAnAccount] = useState(true);

  const handleGuestSignIn = async () => {
    const res = await fetch(
      BACKEND_URL.concat(`${API_BACKEND_SUFFIX}/user/login`),
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          username: "Guest",
          password: "testTEST123!",
        }),
      }
    );
    const response = await res.json();
    if (!response.error) {
      Cookies.set("Auth_Token", response.AuthValidation, { expires: 5 });
      window.location.replace("/");
    } else {
      alert(response.error);
    }
  };
  return haveAnAccount ? (
    <div
      style={{ height: "100svh" }}
      className="d-flex flex-column justify-content-center align-items-center"
    >
      <Signup />
      <button className="btn btn-dark mt-3" onClick={handleGuestSignIn}>
        Sign In As Guest User
      </button>
      <button
        className="btn btn-dark mt-1"
        onClick={() => setHaveAnAccount(!haveAnAccount)}
      >
        Have an account already?
      </button>
    </div>
  ) : (
    <div
      style={{ height: "100svh" }}
      className="d-flex justify-content-center align-items-center"
    >
      <Login />
    </div>
  );
};

export default AuthPage;
