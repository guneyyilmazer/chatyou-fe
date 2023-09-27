import { message } from "../types/MessageType";
import { useState, useRef, useEffect, useMemo } from "react";
import Cookies from "js-cookie";
import "../css/Messages.css";
import { Link } from "react-router-dom";
import { user } from "../types/UserType";
import ImagePreview from "./ImagePreview";
import { useSelector } from "react-redux";
import ListOfSeen from "./ListOfSeen";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
const DefaultProfilePicture = require("../images/default.jpeg");
const Messages = () => {
  const socket = useSelector((shop: any) => shop.app.socket); //will implement the type later

  const user = useSelector((shop: any) => shop.app.user); //will implement the type later
  const chattingWith = useSelector((shop: any) => shop.app.chattingWith); //will implement the type later
  const room = useSelector((shop: any) => shop.app.room); //will implement the type later
  const [showSeen, setShowSeen] = useState(false);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(false);
  const [roomExists, setRoomExists] = useState(true);
  const [loadedAllMessages, setLoadedAllMessages] = useState(false);
  const [loadedFirstMessages, setLoadedFirstMessages] = useState(false);
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
        page,
      }),
    });
    const response = await res.json();
    if (!response.error) {
      setRoomExists(true);

      let newMessages = [...response.messages, ...messages];
      setMessages(newMessages);
      setLoadedFirstMessages(true);
    } else if (response.roomIsEmpty) {
      setRoomExists(false);
    } else {
      setRoomExists(true);

      setLoadedAllMessages(true);
    }
    setLoading(false);
    page == 1 && scrollDown();
  };
  useMemo(loadRoom, [page]);
  useEffect(() => console.log(page), [page]);
  const scrollDown = (to?: any) => {
    messageContainerRef.current &&
      messageContainerRef.current!.scrollIntoView({
        behavior: "smooth",
      });
  };
  const handleScroll = (e: React.UIEvent<HTMLElement>) => {
    if (e.currentTarget.scrollTop == 0) {
      if (!loading) {
        setLoading(true);
        !loadedAllMessages && setPage(page + 1);
      }
    }
  };
  socket.on("update-messages", (messages: any) => setMessages(messages));
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
        },
      ]);
      scrollDown();
      socket.emit("read-msg", room, chattingWith, user);
    }
  );
  const [messages, setMessages] = useState<message[]>([]);

  return !roomExists ? (
    <div className="d-flex m-5 fs-2 text-white justify-content-center">
      Room is empty.
    </div>
  ) : !loadedFirstMessages ? (
    <div className="d-flex m-5 justify-content-center">
      <FontAwesomeIcon
        className="text-white text-center d-block"
        spin
        style={{ height: "60px", width: "60px" }}
        icon={faCircleNotch}
      />
    </div>
  ) : (
    <div
      onScroll={handleScroll}
      className="d-flex flex-column overflow-auto"
      style={{ height: "80vh", width: "43vw" }}
    >
      {loading && !loadedAllMessages && (
        <div className="d-flex justify-content-center">
          <FontAwesomeIcon
            className="text-white text-center d-block"
            spin
            style={{ height: "25px", width: "25px" }}
            icon={faCircleNotch}
          />
        </div>
      )}
      {messages.map((item: message, index: number) => (
        <div
          ref={messageContainerRef}
          key={index}
          className={`mt-5 d-flex ${
            item.sender.username == user.username
              ? "justify-content-end"
              : "justify-content-start"
          }`}
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
            onClick={() => setShowSeen(!showSeen)}
            className={`text-break d-flex flex-column
            ${
              item.sender.username == user.username
                ? "message-sent"
                : "message-received"
            }`}
            style={{ cursor: "pointer" }}
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
          {showSeen && item.seenBy && (
            <ListOfSeen
              users={item.seenBy}
              showSeen={showSeen}
              setShowSeen={setShowSeen}
            />
          )}
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
