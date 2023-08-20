import React from "react";
import io from "socket.io-client";
import Room from "./components/Room";
import JoinRoom from "./components/JoinRoom";

const app = () => {
  const socket = io("http://localhost:3001");
  return (
    <div className="d-flex mt-5 justify-content-center align-items-center">
      <Room />
      {/* <JoinRoom /> */} {/* currently working on Room.tsx component */}
    </div>
  );
};

export default app;
