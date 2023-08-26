import { useRef } from "react";

const Login = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  return (
    <form className="form-group">
      <h2 className="lead">Login</h2>
      <input type="text" ref={usernameRef} className="form-check" placeholder="Enter username" name="" id="" />
      <input type="password" ref={passwordRef} className="form-check" placeholder="Enter password" name="" id="" />
      <button className="btn btn-danger p-2" type="submit"></button>
    </form>
  );
};

export default Login;
