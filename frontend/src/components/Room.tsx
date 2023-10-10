import React, { useMemo, useState } from "react";
import Messages from "./Messages";
import SendMessage from "./SendMessage";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
//@ts-ignore
import background from "../images/background.jpeg";
import { user } from "../types/UserType";
const Room = () => {
  const chattingWith = useSelector((shop: any) => shop.app.chattingWith); //will implement the type later
  const socket = useSelector((shop: any) => shop.app.socket); //will implement the type later

  const room = useSelector((shop: any) => shop.app.room); //will implement the type later

  const [user, setUser] = useState<user>();

  const loadUser = async () => {
    const res = await fetch("http://localhost:4000/verify", {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${Cookies.get("Auth_Token")}`,
      },

      method: "POST",
      body: JSON.stringify({ token: Cookies.get("Auth_Token") }),
    });
    const response = await res.json();
    if (response.error) {
    } else {
      setUser(response);
    }
  };
  useMemo(loadUser, []);

  if (user) {
    socket.emit(
      "join-room",
      chattingWith ? user.userId! + " " + chattingWith : room
    );
  }
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center row col-12"
      style={{
        backgroundImage: `url(${background})`,
        height: "95vh",
        backgroundSize: "600px",
      }}
    >

      <Messages />
      <SendMessage />
    </div>
  );
};

export default Room;
