import {useState} from "react";
import io from "socket.io-client";
import Room from "./components/Room";
import JoinRoom from "./components/JoinRoom";

const App = () => {
  const socket = io("http://localhost:3001");
  const [room,setRoom] = useState(localStorage.getItem("room"))

  return (
    <div className="d-flex flex-column mt-5 justify-content-center align-items-center">
      {room ? (
        //@ts-ignore doesn't have an easy fix
        <Room socket={socket} />
      ) : (
        <JoinRoom socket={socket} setRoom={setRoom} />
      )}
    </div>
  );
};

export default App;
