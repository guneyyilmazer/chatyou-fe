import Cookies from "js-cookie";
import { useState } from "react";

const ListOfSeen = ({ users,showSeen,setShowSeen }: any) => {
  return (
    <div
      style={{ height: "100vh", width: "100vw" }}
      className="bg-dark position-relative text-white position-absolute top-0 start-0"
    >
      {users && (
        <div className="d-flex flex-column">
          <span className="lead fs-2 my-4 text-center">Seen By</span>
          {users.map((item: any) => (
            <div className="d-flex flex-wrap justify-content-center align-items-center text-white">
              <img
                className="rounded-5"
                style={{ height: "40px", width: "40px" }}
                src={item.profilePicture}
                alt=""
              />
              <span className="ms-1">{item.username}</span>{" "}
            </div>
            //@ts-ignore
          ))}
        </div>
      )}
      <button onClick={()=>setShowSeen(!showSeen)} className="btn btn-danger position-absolute top-0 end-0">X</button>
    </div>
  );
};

export default ListOfSeen;
