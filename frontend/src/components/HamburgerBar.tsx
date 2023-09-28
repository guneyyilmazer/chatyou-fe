import React, { useState } from "react";
import SearchBar from "./SearchBar";
import { useSelector, useDispatch } from "react-redux";
import { setRoom, setChattingWith } from "../features/appSlice";
import Cookies from "js-cookie";
import "../css/HamburgerBar.css";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const HamburgerBar = () => {
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(true);
  const room = useSelector((shop: any) => shop.app.room); //will implement the type later
  const chattingWith = useSelector((shop: any) => shop.app.chattingWith); //will implement the type later
  return collapsed ? (
    <div className="collapsed">
      {" "}
      <button
        className="position-absolute hamburger-button top-0 start-0"
        onClick={() => setCollapsed(!collapsed)}
      >
        <FontAwesomeIcon icon={faBars} />
      </button>
      <div className="d-flex justify-content-center">
        <SearchBar />
      </div>
    </div>
  ) : (
    <nav className="hamburger-bar">
      <button onClick={() => setCollapsed(!collapsed)} className="exit-button">
        X
      </button>
      <div className="button-group">
        <button
          onClick={() => {
            room && dispatch(setRoom(""));
            localStorage.setItem("room", "");
            chattingWith && dispatch(setChattingWith(""));
            localStorage.setItem("chattingWith", "");
            window.location.replace("/");
          }}
        >
          Home
        </button>
        <div></div>
        <button
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

export default HamburgerBar;
