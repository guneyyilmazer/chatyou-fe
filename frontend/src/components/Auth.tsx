import React, { useState, useEffect, useMemo } from "react";
import Cookies from "js-cookie";
import AuthPage from "../pages/AuthPage";

const verify = async () => {
  const token = Cookies.get("Auth_Token");
  const res = await fetch("http://localhost:4000/verify", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token
    }),
  });
  return await res.json();
};
const withAuth = (HocComponent:any) => {
  return (props:any) => {
    const [state, setState] = useState(0); 
    useMemo(async () => {
      const res = await verify();
      if (!res.valid) {
        setState(1);
      } else {
        setState(2);
      }
    },[]);
    return state == 2 ? ( 
        // Using a count state prevents the Auth Page flashing up on reload. Because it returns with inital state value first time this function gets run.
      <HocComponent {...props} />
    ) : state == 1 ? (
      <AuthPage />
    ) : (
      ""
    );
  };
};
export default withAuth;
