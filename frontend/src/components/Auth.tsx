import React, { useState, useEffect, useMemo } from "react";
import Cookies from "js-cookie";
import AuthPage from "../pages/AuthPage";
import { setUser } from "../features/appSlice";
import { useDispatch } from "react-redux";
import { redirect } from "react-router-dom";
import { IP, BACKEND_PORT } from "../index";
type verified = {
  valid: boolean;
  userId: string;
  username: string;
};
type notVerified = {
  valid: boolean;
  error: string;
};
const logUserIn = async (dispatch: any) => {
  const res = await fetch(IP.concat(`${BACKEND_PORT}/user/loadUser`), {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${Cookies.get("Auth_Token")}`,
    },

    method: "POST",
    body: JSON.stringify({
      token: Cookies.get("Auth_Token"),
    }),
  });
  const { userId, username, profilePicture } = await res.json();
  dispatch(setUser({ userId, username, profilePicture }));
};
const verify = async () => {
  const token = Cookies.get("Auth_Token");
  const res = await fetch(IP.concat(`${BACKEND_PORT}/verify`), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token,
    }),
  });
  return (await res.json()) as verified | notVerified;
};

const withAuth = (HocComponent: any) => {
  return (props: any) => {
    const [state, setState] = useState(0);
    const dispatch = useDispatch();
    useMemo(async () => {
      const res = await verify();
      if (!res.valid) {
        setState(1);
        redirect("/auth");
      } else {
        await logUserIn(dispatch);

        setState(2);
      }
    }, []);
    return state == 2 ? (
      // Using a count state prevents the Auth Page flashing up on reload. Because it returns with inital state value first time this function gets run.
      <HocComponent {...props} />
    ) : state == 1 ? (
      <AuthPage />
    ) : (
      <></>
    );
  };
};
export default withAuth;
