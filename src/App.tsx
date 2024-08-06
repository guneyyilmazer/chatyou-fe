import { useEffect, useState } from "react";
import io from "socket.io-client";
import Room from "./components/Room";
import JoinRoom from "./components/JoinRoom";
import Auth from "./components/Auth";
import { useSelector, useDispatch } from "react-redux";
import { setRoom, setSocket } from "./features/appSlice";
import {IP} from './index'
const App = () => {
  const dispatch = useDispatch();
  const room = useSelector((shop: any) => shop.app.room); //will implement the type later
  const chattingWith = useSelector((shop: any) => shop.app.chattingWith); //will implement the type later
  const socket = io(IP.concat(":3001"));
  dispatch(setSocket(socket));
  // to keep the state in localStorage as well
  useEffect(() => {
    room != "" && localStorage.setItem("room", room);
  }, [room]);
  useEffect(() => {
    //prevents the initial useEffect call
    //because of this when on click on a searchBarResult the room state doesn't get emptied
    if (chattingWith != "") {
      localStorage.setItem("chattingWith", chattingWith);
      dispatch(setRoom(""));
      localStorage.removeItem("room");
    }
  }, [chattingWith]);

  return (
    <div>
      {room || chattingWith ? <Room /> : <JoinRoom />}
    </div>
  );
};

export default Auth(App);
