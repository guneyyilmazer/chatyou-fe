import React from "react";
import io from "socket.io-client";
import Room from "./components/Room";
import JoinRoom from "./components/JoinRoom";

const app = () => {
  const socket = io("http://localhost:3001");

  return (
    <div className="d-flex flex-column mt-5 justify-content-center align-items-center">
      {localStorage.getItem("room") ? (
        //@ts-ignore doesn't have an easy fix
        <Room socket={socket} />
      ) : (
        <JoinRoom socket={socket} />
      )}
    </div>
  );
};

export default app;
