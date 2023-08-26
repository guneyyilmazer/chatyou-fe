import Login from "../components/Login";
import Signup from "../components/Signup";
import { useState } from "react";
const AuthPage = () => {
  const [haveAnAccount, setHaveAnAccount] = useState(true);
  return (
    <div className="">
      {haveAnAccount ? (
        <div className="d-flex flex-column justify-content-center align-items-center">
          <Signup />
          <button className="btn btn-dark mt-3" onClick={() => setHaveAnAccount(!haveAnAccount)}>
            Have an account already?
          </button>
        </div>
      ) : (
        <div className="d-flex justify-content-center align-items-center">
          <Login />
        </div>
      )}
    </div>
  );
};

export default AuthPage;
