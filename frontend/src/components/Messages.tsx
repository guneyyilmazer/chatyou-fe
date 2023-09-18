import { message } from "../types/MessageType";
import { useState, useRef, useEffect, useMemo } from "react";
import Cookies from "js-cookie";
import "../css/Messages.css";
import { Link } from "react-router-dom";
import { user } from "../types/UserType";
import ImagePreview from "./ImagePreview";
import { useSelector } from "react-redux";
import ListOfSeen from "./ListOfSeen";
const DefaultProfilePicture = require("../images/default.jpeg");
const Messages = () => {
  const socket = useSelector((shop: any) => shop.app.socket); //will implement the type later

  const user = useSelector((shop: any) => shop.app.user); //will implement the type later
  const room = useSelector((shop: any) => shop.app.room); //will implement the type later
  const [showSeen, setShowSeen] = useState(false);
  const [preview, setPreview] = useState(false);
  const [previewPictures, setPreviewPictures] = useState<string[]>();
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
        userId: user.userId,
      }),
    });
    const response = await res.json();
    console.log(response);
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
      user: user,
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
          seenBy:[{userId:"1"}]
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
          onClick={() => setShowSeen(!showSeen)}
          className={
            item.sender.username == user.username
              ? "mt-5 d-flex justify-content-end"
              : "mt-5 d-flex justify-content-start"
          }
        >
          {item.sender.username != user.username && (
            <Link
              className="d-flex align-items-center me-2"
              to={`/users/${item.sender.userId}`}
            >
              <img
                style={{ height: "35px", width: "35px" }}
                className="rounded-5"
                src={
                  item.profilePicture
                    ? item.profilePicture
                    : DefaultProfilePicture
                }
              />
            </Link>
          )}
          <div
            className={
              item.sender.username == user.username
                ? "message-sent text-break d-flex flex-column"
                : "message-received text-break d-flex flex-column"
            }
          style={{cursor:"pointer"}}

          >
            <div className="ms-1">{item.content + " "}</div>

            <div className="d-flex flex-wrap">
              {" "}
              {item.pictures?.map((picture, index) => (
                <div className="m-1" key={index}>
                  <img
                    className="img-fluid rounded-2"
                    onClick={() => {
                      setPreview(true);
                      setPreviewPictures(item.pictures);
                    }}
                    style={{ maxWidth: "100px", maxHeight: "150px" }}
                    src={picture as string}
                    alt=""
                  />
                </div>
              ))}
            </div>
            <div className="username ms-1 d-flex justify-content-end align-items-end">
              {item.sender.username} {item.sent}{" "}
            </div>
          </div>
          {item.sender.username == user.username && (
            <Link
              className="d-flex align-items-center"
              to={`/users/${item.sender.userId}`}
            >
              <img
                style={{ height: "35px", width: "35px" }}
                className="ms-2 rounded-5"
                src={
                  item.profilePicture
                    ? item.profilePicture
                    : DefaultProfilePicture
                }
              />
            </Link>
          )}
          {showSeen && <ListOfSeen users = {item.seenBy} showSeen={showSeen} setShowSeen={setShowSeen} />}
        </div>
      ))}
      {preview && previewPictures && (
        <ImagePreview
          setPreview={setPreview}
          preview={preview}
          images={previewPictures as string[]}
        />
      )}
    </div>
  );
};

export default Messages;
