import React, { useState } from "react";
import "../css/SearchBar.css";
import { Link } from "react-router-dom";
const DefaultProfilePicture = require("../images/default.jpeg");

const SearchBarResults = ({ users, rooms }: any) => {
  const [show, setShow] = useState(true);
  return (
    <div className="bg-dark">
      {(users && show) &&
        users.map((item: any) => (
          <div className="results d-flex py-3 ps-2 align-items-center">
            <Link onClick={()=>setShow(!show)} to={`users/${item._id}`}>
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
    </div>
  );
};

export default SearchBarResults;
