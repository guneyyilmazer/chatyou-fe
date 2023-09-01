import React, { useMemo, useState } from "react";
import Messages from "./Messages";
import SendMessage from "./SendMessage";
import Cookies from "js-cookie";
//@ts-ignore
import background from '../images/background.jpeg'


const Room = ({socket,room}:any) => {
  
  const [username, setUsername] = useState();

  const loadUser = async() => {
    const res = await fetch("http://localhost:4000/user/loadUser", {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${Cookies.get("Auth_Token")}`,
      },

      method: "POST",
      body: JSON.stringify({ token:Cookies.get("Auth_Token") }),
    });
    const response = await res.json()
    if(response.error){

    }
    else{
      setUsername(response.username)
    }

  }
  useMemo(loadUser,[])

  socket.emit("join-room",localStorage.getItem("room"))
  return (
    <div className="d-flex flex-column justify-content-center align-items-center row col-12"
    style={{backgroundImage:`url(${background})`,height:"95vh",backgroundSize:"600px"}}>
        <Messages room={room} socket={socket} />
        <SendMessage username={username} room={room} socket={socket}/>
      </div>
  );
};

export default Room;
