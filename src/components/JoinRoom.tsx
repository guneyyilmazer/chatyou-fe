import React, { useRef } from "react";
import Rooms from "./Rooms";
import { setRoom } from "../features/appSlice";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
const JoinRoom = () => {
  const socket = useSelector((shop: any) => shop.app.socket); //will implement the type later

  //can't find the type
  const dispatch = useDispatch();
  const roomInputRef = useRef<HTMLInputElement>(null);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      roomInputRef.current?.value &&
      roomInputRef.current.value.length <= 40
    ) {
      socket.emit("join-room", roomInputRef.current.value,Cookies.get("Auth_Token"));

      dispatch(setRoom(roomInputRef.current!.value));
    } else {
      if (roomInputRef.current && roomInputRef.current.value.length > 40)
        alert("Room name must be a maximum of 40 characters long.");
      else alert("Room can't be empty!");
    }
  };
  return (
    <div className="d-flex row col-12 justify-content-center align-items-center flex-column">
      <form onSubmit={handleSubmit} className="col-10 col-md-6 col-lg-4 my-5">
        <div className="form-group d-flex flex-column flex-md-row">
          <input
            type="text"
            ref={roomInputRef}
            className="form-control p-3"
            placeholder="Enter Room..."
          />
          <button
            type="submit"
            className="btn btn-danger text-center mt-4 mt-md-0 ms-md-2 px-4"
          >
            {" "}
            Join
          </button>
        </div>
      </form>
      <div className="col-10 col-md-6 col-lg-4 mt-1">
        <Rooms />
      </div>
    </div>
  );
};

export default JoinRoom;
