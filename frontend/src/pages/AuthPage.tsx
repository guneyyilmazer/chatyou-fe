import Login from "../components/Login";
import Signup from "../components/Signup";
import { useState } from "react";
const AuthPage = () => {
  const [haveAnAccount, setHaveAnAccount] = useState(true);
  return (
      haveAnAccount ? (
        <div style={{height:"100svh"}} className="d-flex flex-column justify-content-center align-items-center">
          <Signup />
          <button className="btn btn-dark mt-3" onClick={() => setHaveAnAccount(!haveAnAccount)}>
            Have an account already?
          </button>
        </div>
      ) : (
        <div style={{height:"100svh"}} className="d-flex justify-content-center align-items-center">
          <Login />
        </div>
      )
  );
};

export default AuthPage;
