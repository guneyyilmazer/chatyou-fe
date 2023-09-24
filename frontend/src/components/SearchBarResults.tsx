import React, { useState } from "react";
import "../css/SearchBar.css";
import { Link } from "react-router-dom";
import { setRoom } from "../features/appSlice";
import { useDispatch, useSelector } from "react-redux";
const DefaultProfilePicture = require("../images/default.jpeg");

const SearchBarResults = ({ users, rooms, searchFor, show, setShow }: any) => {
  const dispatch = useDispatch();

  return (
    <div className="bg-dark">
      {users &&
        searchFor == "users" &&
        users.map((item: any) => (
          <div className="results d-flex py-3 ps-2 align-items-center">
            <Link
              className="text-decoration-none"
              onClick={() => setShow(!show)}
              to={`users/${item._id}`}
            >
              <img
                style={{ height: "40px", width: "40px" }}
                className="rounded-3"
                src={
                  item.profilePicture
                    ? item.profilePicture
                    : DefaultProfilePicture
                }
              />
              <span className="ms-2 text-white text-decoration-none">
                {item.username}
              </span>
            </Link>
          </div>
        ))}
      {rooms &&
        searchFor == "rooms" &&
        rooms.map((item: any) => (
          <div className="results d-flex py-3 ps-2 align-items-center">
            <span
              className="text-decoration-none"
              onClick={() => {
                setShow(!show);
                dispatch(setRoom(item.name));
                window.location.reload()
              }}
            >
              <span
                style={{
                  textDecoration: "none",
                  background: "none",
                  border: "none",
                }}
                className="ms-2 text-white text-decoration-none"
              >
                {item.name}
              </span>
            </span>
          </div>
        ))}
    </div>
  );
};

export default SearchBarResults;
