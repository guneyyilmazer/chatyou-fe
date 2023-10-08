import { faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from "js-cookie";
import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";

const DirectMessages = () => {
  const user = useSelector((shop: any) => shop.app.user);
  const [rooms, setRooms] = useState([]);
  const loadRoom = async () => {
    const res = await fetch("http://localhost:4000/loadPrivateRooms", {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${Cookies.get("Auth_Token")}`,
      },

      method: "POST",
    });
    const response = await res.json();
    if (!response.error) {
      setRooms(response.rooms);
    }
  };
  useMemo(loadRoom, []);
  return (
    <div className="text-white d-flex justify-content-center align-items-center flex-column">
      DirectMessages
      {rooms &&
        rooms.map((item: any) => {
          const chattingWith = item.users.filter(
            (object: any) => object.username != user.username
          )[0];

          const isTheMessageSeen = item.lastMessage.seenBy.filter((item:string)=>item==user.userId).length == 0 ? false : true
          return (
            <div style={{cursor:"pointer"}} onClick={()=>{localStorage.setItem("chattingWith",chattingWith.username);window.location.replace("/")}} className={"d-flex align-items-center ".concat(isTheMessageSeen ?" text-secondary " : " text-white " )}>
              <img
                style={{ height: "50px", width: "50px" }}
                className="rounded-5"
                src={chattingWith.profilePicture}
                alt=""
                />
              <span className="mx-1">{chattingWith.username}:</span>
              <span >{item.lastMessage.content}</span>
              <span className="mx-1">{item.lastMessage.sent}</span>
              {!isTheMessageSeen && <FontAwesomeIcon title="You have unread messages!" className="bg-danger p-2 rounded-5" icon={faBell} />}
            </div>
          );
        })}
    </div>
  );
};

export default DirectMessages;
