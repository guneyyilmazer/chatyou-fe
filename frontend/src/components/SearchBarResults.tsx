import { Link } from "react-router-dom";
import "../css/SearchBar.css";
import { setRoom } from "../features/appSlice";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { user } from "../types/UserTypes";
const DefaultProfilePicture = require("../images/default.jpeg");

const SearchBarResults = ({
  users,
  rooms,
  searchFor,
  show,
  setShow,
  userNotFound,
  roomNotFound,
}: {
  users: user[];
  rooms: {name:string}[];
  searchFor: string;
  show: boolean;
  setShow: any;
  userNotFound: boolean;
  roomNotFound: boolean;
}) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => setShow(false), [location]);
  return show ? (
    <div className="bg-dark text-white">
      {searchFor == "users" &&
        (!userNotFound ? (
          users.map((item, index) => (
            <div
              key={index}
              className=" results d-flex py-3 ps-2 align-items-center text-decoration-none"
              onClick={() => {
                navigate(`users/${item._id}`);
              }}
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
            </div>
          ))
        ) : (
          <div className="text-center py-2">No results.</div>
        ))}
      {searchFor == "rooms" &&
        (!roomNotFound ? (
          rooms.map((item, index) => (
            <div
              key={index}
              onClick={() => {
                dispatch(setRoom(item.name));
                navigate("/");
              }}
              className="results d-flex py-3 ps-2 align-items-center"
            >
              <span className="text-decoration-none">
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
          ))
        ) : (
          <div className="text-center py-2">No results.</div>
        ))}
    </div>
  ) : (
    <></>
  );
};

export default SearchBarResults;
