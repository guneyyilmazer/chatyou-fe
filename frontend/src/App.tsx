import {useState} from "react";
import io from "socket.io-client";
import Room from "./components/Room";
import JoinRoom from "./components/JoinRoom";
import Auth from "./components/Auth"
import {useSelector} from 'react-redux'

const App = () => {
  const room = useSelector((shop:any)=>shop.app.room) //will implement the type later
  const chattingWith = useSelector((shop:any)=>shop.app.chattingWith) //will implement the type later
  const socket = io("http://localhost:3001");

  return (
    <div className="d-flex flex-column justify-content-center align-items-center" >
      {room || chattingWith ? (
        //@ts-ignore doesn't have an easy fix
        <Room socket={socket}  />
      ) : (
        <JoinRoom socket={socket} />
      )}
    </div>
  );
};

export default Auth(App);
