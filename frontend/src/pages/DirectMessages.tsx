import { faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from "js-cookie";
import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { setChattingWith } from "../features/appSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const DefaultProfilePicture = require("../images/default.jpeg")
const DirectMessages = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((shop: any) => shop.app.user);
  type room = {
    name: string;
    users: [{ userId: string; username: string; profilePicture: string }];
    lastMessage: {
      sender: {
        username: string;
        userId: string;
        content: string;
        sent: string;
        seenBy: [string];
      };
    };
  };
  const [rooms, setRooms] = useState<room[]>();
  const loadPrivateRooms = async () => {
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
  useEffect(() => {
    loadPrivateRooms();
  }, []);
  return rooms?(
    <div className="text-white d-flex justify-content-center align-items-center flex-column">
      <span className="lead">Direct Messages</span>
      {rooms.length != 0
        ? rooms.map((item: any) => {
          //find who client is chatting with
            const chattingWith = item.users.filter(
              (object: any) => object.userId != user.userId
            )[0];

            //check seenBy array to see if client's userId is in there
            const isTheMessageSeen =
              item.lastMessage.seenBy.filter(
                (item: string) => item == user.userId
              ).length == 0
                ? false
                : true;
            return (
              <div
                style={{ cursor: "pointer" }}
                onClick={() => {
                  dispatch(setChattingWith(chattingWith.userId));

                  navigate("/");
                }}
                className={"d-flex align-items-center mt-2 ".concat(
                  isTheMessageSeen ? " text-secondary " : " text-white "
                )}
              >
                <img
                  style={{ height: "25px", width: "25px" }}
                  className="rounded-5"
                  src={chattingWith.profilePicture ? chattingWith.profilePicture : DefaultProfilePicture}
                  alt=""
                />
                <span className="mx-1">{chattingWith.username}:</span>
                <span>{item.lastMessage.content}</span>
                <span className="mx-3">{item.lastMessage.sent}</span>
                {!isTheMessageSeen && (
                  <FontAwesomeIcon
                    title="You have unread messages!"
                    className="bg-danger p-2 rounded-5"
                    icon={faBell}
                  />
                )}
              </div>
            );
          })
        : ( //else rooms.length == 0
            <div className="lead my-5">
              You dont have any messages, start a chat by clicking on a user.
            </div>
          )}
    </div>
  ):<div className="text-white text-center lead my-5">Can't load private rooms</div>;
};

export default DirectMessages;
