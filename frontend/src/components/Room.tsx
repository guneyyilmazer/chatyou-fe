import React from "react";
import Messages from "./Messages";
import SendMessage from "./SendMessage";

const Room = ({socket}:any) => {
  socket.emit("join-room",localStorage.getItem("room"))
  return (
    <div className="d-flex flex-column justify-content-center align-items-center row col-12">
        <Messages socket={socket} />
        <SendMessage socket={socket}/>
      </div>
  );
};

export default Room;
