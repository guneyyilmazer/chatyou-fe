import React, { useMemo, useState } from "react";
import Messages from "./Messages";
import SendMessage from "./SendMessage";
import Cookies from "js-cookie";
import {useSelector} from 'react-redux'
//@ts-ignore
import background from "../images/background.jpeg";
import {user} from '../types/UserType'
const Room = ({ socket, chattingWith }: any) => {
  const room = useSelector((shop:any)=>shop.app.room) //will implement the type later

  
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
      console.log(response)
      setUser(response);
    }
  };
  useMemo(loadUser, []);

  if (user) {
    socket.emit(
      "join-room",
      localStorage.getItem("chattingWith")
        ? user.username! + " " + localStorage.getItem("chattingWith")
        : localStorage.getItem("room")
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
      <Messages socket={socket}/>
      <SendMessage
        chattingWith={chattingWith}
        socket={socket}
      />
      
    </div>
  );
};

export default Room;
