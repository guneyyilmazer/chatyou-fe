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
import {
  setLoading,
  setLoadedFirstMessages,
  setEmptyRoom,
} from "../features/appSlice";
import { useDispatch } from "react-redux";
const DefaultProfilePicture = require("../images/default.jpeg");
const Messages = () => {
  const socket = useSelector((shop: any) => shop.app.socket); //will implement the type later

  const user = useSelector((shop: any) => shop.app.user); //will implement the type later
  const emptyRoom = useSelector((shop: any) => shop.app.emptyRoom); //will implement the type later
  const chattingWith = useSelector((shop: any) => shop.app.chattingWith); //will implement the type later
  const room = useSelector((shop: any) => shop.app.room); //will implement the type later
  const [showSeen, setShowSeen] = useState(false);
  const [page, setPage] = useState(1);
  const loading = useSelector((shop: any) => shop.app.loading);
  const [preview, setPreview] = useState(false);
  const [typing, setTyping] = useState<any>([]);
  const [roomExists, setRoomExists] = useState(true);
  const [loadedAllMessages, setLoadedAllMessages] = useState(false);
  const loadedFirstMessages = useSelector(
    (shop: any) => shop.app.loadedFirstMessages
  ); //will implement the type later

  const [previewPictures, setPreviewPictures] = useState<string[]>();
  const [previewPicturesIndex, setPreviewPicturesIndex] = useState(0);
  const messageContainerRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
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
      dispatch(setEmptyRoom(false));

      let newMessages = [...response.messages, ...messages];
      setMessages(newMessages);
      dispatch(setLoadedFirstMessages(true));
    } else if (response.roomIsEmpty) {
      dispatch(setEmptyRoom(true));
    } else {
      dispatch(setEmptyRoom(false));

      setLoadedAllMessages(true);
    }
    dispatch(setLoading(false));
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
        dispatch(setLoading(true));
        !loadedAllMessages && setPage(page + 1);
      }
    }
  };
  useEffect(()=>console.log(typing),[typing])
  socket.on("update-messages", (messages: any) => setMessages(messages));

  socket.on("typing-to-client", (user: user) => {
    if (typing.length != 0) {
      console.log(typing)
      const doWeAlreadyHave = typing.filter( // şu // acaba typing in bir onceki halini mi alıyor
        (item: user) => item.userId == user.userId // şu
      );
      doWeAlreadyHave.length != 0 && setTyping([...typing, user]); // ve şu satırlar hatalı
    }
    else{setTyping([user])}
  });
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
      dispatch(setEmptyRoom(false));
      dispatch(setLoadedFirstMessages(true));
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

  return emptyRoom ? (
    <div className="d-flex m-5 fs-2 text-white justify-content-center">
      Room is empty.
    </div>
  ) : !loadedFirstMessages ? (
    <div className="d-flex justify-content-center">
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
      className="d-flex flex-column overflow-auto col-10 col-md-6 col-lg-5"
      style={{ height: "80vh" }}
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
      <div className="position-absolute w-100 bottom-0 bg-danger text-white d-flex justify-content-center align-items-center">
        {typing.map((item: user) => item.username)}
      </div>
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
                      setPreviewPicturesIndex(index);
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
          previewPicturesIndex={previewPicturesIndex}
          images={previewPictures as string[]}
        />
      )}
    </div>
  );
};

export default Messages;
