import Cookies from "js-cookie";
import { useState } from "react";

const ListOfSeen = ({ users }: any) => {
  console.log(users)
  return (
    <div
      style={{ height: "100vh", width: "100vw" }}
      className="bg-dark text-white position-absolute top-0 start-0"
    >
      {users &&
        users.map((item: any) => (
          <div className="text-white">{item.username} </div>
          //@ts-ignore
        ))}
    </div>
  );
};

export default ListOfSeen;
