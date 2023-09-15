import React, { useRef } from "react";
import Rooms from "./Rooms";
import { setRoom } from "../features/appSlice";
import { useDispatch,useSelector } from "react-redux";
const JoinRoom = () => {
  const socket = useSelector((shop:any)=>shop.app.socket) //will implement the type later

  //can't find the type
  const dispatch = useDispatch();
  const roomInputRef = useRef<HTMLInputElement>(null);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (roomInputRef.current?.value) {
      socket.emit("join-room", roomInputRef.current.value);
      localStorage.setItem("room", roomInputRef.current!.value);

      dispatch(setRoom(roomInputRef.current!.value));
    } else {
      alert("Room can't be empty!");
    }
  };
  return (
    <div className="d-flex row col-12 justify-content-center align-items-center flex-column">
      <form onSubmit={handleSubmit} className="col-6 my-5">
        <div className="form-group d-flex">
          <input
            type="text"
            ref={roomInputRef}
            className="form-control p-3"
            placeholder="Enter Room..."
          />
          <button type="submit" className="btn btn-danger ms-2 px-4">
            {" "}
            Join
          </button>
        </div>
      </form>
      <div className="col-4 mt-1">
        <Rooms />
      </div>
    </div>
  );
};

export default JoinRoom;
