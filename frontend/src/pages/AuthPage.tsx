import Login from "../components/Login";
import Signup from "../components/Signup";
import { useState } from "react";
const AuthPage = () => {
  const [haveAnAccount, setHaveAnAccount] = useState(false);
  return (
    <div>
      {haveAnAccount ? (
        <div className="col-6">
          <Signup />
          <button onClick={() => setHaveAnAccount(!haveAnAccount)}>
            Have an account?
          </button>
        </div>
      ) : (
        <div className="col-6">
          <Login />
        </div>
      )}
    </div>
  );
};

export default AuthPage;
