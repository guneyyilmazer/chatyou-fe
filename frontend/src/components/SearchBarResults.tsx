import React, { useState } from "react";
import '../css/SearchBar.css'
const DefaultProfilePicture = require("../images/default.jpeg")

const SearchBarResults = ({ users, rooms }: any) => {
  return (
    <div className="bg-dark">
      {users &&
        users.map((item: any) => (
          <div className="text-white results d-flex py-3 ps-2 align-items-center">
            
            <img
              style={{ height: "40px", width: "40px" }}
              className="rounded-3"
              src={item.profilePicture ? item.profilePicture : DefaultProfilePicture}
            />
            <span className="ms-2">
            {item.username}
                </span>
          </div>
        ))}
    </div>
  );
};

export default SearchBarResults;
