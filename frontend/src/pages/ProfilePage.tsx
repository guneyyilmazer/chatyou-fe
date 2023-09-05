import React, { useState, useMemo, useEffect } from "react";
import NotFound404 from "../pages/NotFound404.jsx";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
const ProfilePage = () => {
  const { username } = useParams();

  const [user, setUser] = useState({});
  const [client, setClient] = useState({});
  const getUserData = async () => {
    const res = await fetch("http://localhost:4000/user/loadUser", {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${Cookies.get("Auth_Token")}`,
      },
      method: "POST",
      body: JSON.stringify({
        username,
      }),
    });

    const user = await res.json();
    setUser(user);

    const response = await fetch("http://localhost:4000/verify", {
      headers: {
        "Content-Type": "application/json",
      },

      method: "POST",
      body: JSON.stringify({ token: Cookies.get("Auth_Token") }),
    });
    const client = response.json();
    setClient(client);
  };

  useMemo(getUserData, []);

  return <div className="text-white"></div>;
};

export default ProfilePage;
