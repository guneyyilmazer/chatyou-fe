import { message } from "../types/MessageType";
import { useState, useRef, useEffect, useMemo } from "react";
import Cookies from "js-cookie";
import "../css/Messages.css";
import { Link } from "react-router-dom";
const DefaultProfilePicture =require( "../images/default.jpeg")
const Messages = ({ socket, room, username }: any) => {
  const messageContainerRef = useRef<HTMLDivElement>(null);
  const loadRoom = async () => {
    const res = await fetch("http://localhost:4000/loadRoom", {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${Cookies.get("Auth_Token")}`,
      },

      method: "POST",
      body: JSON.stringify({
        room,
        chattingWith: localStorage.getItem("chattingWith"),
      }),
    });
    const response = await res.json();
    if (!response.error) {
      setMessages(response.messages);
      scrollDown();
    }
  };
  useMemo(loadRoom, []);
  const scrollDown = () => {
    messageContainerRef.current &&
      messageContainerRef.current!.scrollIntoView({
        behavior: "smooth",
      });
  };

  socket.on(
    "receive-msg",
    (
      user: string,
      content: string,
      pictures: string[],
      sent: string,
      profilePicture: string
    ) => {
      const hours = sent.split(":")[0];
      const minutes = sent.split(":")[1];
      setMessages([
        ...messages,
        {
          sender: user,
          content,
          pictures,
          sent:
            (hours.length == 1 ? "0".concat(hours) : hours) +
            ":" +
            (minutes.length == 1 ? "0".concat(minutes) : minutes),
          profilePicture,
        },
      ]);
    }
  );
  const [messages, setMessages] = useState<message[]>([]);
  useEffect(scrollDown, [messages]);

  return (
    <div
      className="d-flex flex-column overflow-auto"
      style={{ height: "80vh", width: "43vw" }}
    >
      {messages.map((item: message, index: number) => (
        <div
          ref={messageContainerRef}
          key={index}
          className={
            item.sender == username
              ? "mt-5 d-flex justify-content-end"
              : "mt-5 d-flex justify-content-start"
          }
        >
            {item.sender != username &&<Link
            className="d-flex align-items-center me-2"
            to={`/users/${item.sender}`}
          >
            <img
              style={{ height: "35px", width: "35px" }}
              className="rounded-5"
              src={item.profilePicture ? item.profilePicture : DefaultProfilePicture}
            />
          </Link>}
          <div
            className={
              item.sender == username
                ? "message-sent text-break d-flex"
                : "message-received text-break d-flex"
            }
          >
            {item.content + " "}
            <div className="username ms-1 d-flex align-items-end">
              {item.sender} {item.sent}{" "}
            </div>
            <div className="d-flex flex-wrap">
              {" "}
              {item.pictures?.map((item, index) => (
                <div className="m-1" key={index}>
                  <img
                    className="img-fluid"
                    style={{ width: "100px", height: "130px" }}
                    src={item as string}
                    alt=""
                  />
                </div>
              ))}
            </div>
          </div>
        { item.sender == username && <Link
            className="d-flex align-items-center"
            to={`/users/${item.sender}`}
          >
            <img
              style={{ height: "35px", width: "35px" }}
              className="ms-2 rounded-5"
              src={item.profilePicture ? item.profilePicture : DefaultProfilePicture}
            />
          </Link>}
        </div>
      ))}
    </div>
  );
};

export default Messages;
