import React from "react";
import SearchBar from "./SearchBar";
import { useSelector, useDispatch } from "react-redux";
import { setRoom, setChattingWith } from "../features/appSlice";
import Cookies from "js-cookie";
import '../css/Navbar.css'

const Navbar = () => {
  const dispatch = useDispatch();
  const room = useSelector((shop: any) => shop.app.room); //will implement the type later
  const chattingWith = useSelector((shop: any) => shop.app.chattingWith); //will implement the type later
  return (
    <nav className="nav" >
      <div className="btn-group">
        <button
          onClick={() => {
            room && dispatch(setRoom(""));
            localStorage.setItem("room", "");
            chattingWith && dispatch(setChattingWith(""));
            localStorage.setItem("chattingWith", "");
            window.location.replace("/");
          }}
          className="btn btn-danger"
        >
          Home
        </button>
      </div>
      <div
        className="position-absolute start-50 "
        style={{ transform: "translate(-50%,0%)" }}
      >
        <SearchBar />
      </div>
      <div className="">
        <button
          className="btn btn-danger mx-1"
          onClick={() => {
            Cookies.remove("Auth_Token");
            window.location.reload();
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
