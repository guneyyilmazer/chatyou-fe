import { faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from "js-cookie";
import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { setChattingWith } from "../features/appSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const DirectMessages = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
      <span className="lead">Direct Messages</span>
      {rooms.length != 0 ? (
        rooms.map((item: any) => {
          const chattingWith = item.users.filter(
            (object: any) => object.userId != user.userId
          )[0];

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
                style={{ height: "30px", width: "30px" }}
                className="rounded-5"
                src={chattingWith.profilePicture}
                alt=""
              />
              <span className="mx-1">{chattingWith.userId}:</span>
              <span>{item.lastMessage.content}</span>
              <span className="mx-1">{item.lastMessage.sent}</span>
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
      ) : (
        <div className="lead my-5">
          You dont have any messages, start a chat by clicking on a user.
        </div>
      )}
    </div>
  );
};

export default DirectMessages;
