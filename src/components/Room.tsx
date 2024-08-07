import { useEffect, useState } from "react";
import Messages from "./Messages";
import SendMessage from "./SendMessage";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import { user } from "../types/AllTypes";
import { API_BACKEND_SUFFIX, BACKEND_URL } from "..";
const background = require("../images/background.jpeg");
const Room = () => {
  const chattingWith = useSelector((shop: any) => shop.app.chattingWith); //will implement the type later
  const socket = useSelector((shop: any) => shop.app.socket); //will implement the type later

  const room = useSelector((shop: any) => shop.app.room); //will implement the type later

  const [user, setUser] = useState<user>();

  const loadUser = async () => {
    const res = await fetch(BACKEND_URL.concat(`${API_BACKEND_SUFFIX}/verify`), {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${Cookies.get("Auth_Token")}`,
      },

      method: "POST",
      body: JSON.stringify({ token: Cookies.get("Auth_Token") }),
    });
    const response = await res.json();
    if (!response.error) {
      setUser(response);
    }
  };
  useEffect(()=>{loadUser()}, []);

  if (user) {
    socket.emit(
      "join-room",
      chattingWith ? user.userId! + " " + chattingWith : room,
      Cookies.get("Auth_Token")
    );
  }
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center col-12"
      style={{
        backgroundImage: `url(${background})`,
        height: "95svh",
        backgroundSize: "600px",
      }}
    >
      <Messages />
      <div className="col-12">
        <SendMessage />
      </div>
    </div>
  );
};

export default Room;
