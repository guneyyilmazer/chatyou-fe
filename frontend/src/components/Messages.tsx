import { message } from "../types/MessageType";
import { useState, useRef, useEffect, useMemo } from "react";
import Cookies from "js-cookie";
import "../css/Messages.css";
const Messages = ({ socket, room,username }: any) => {
 
  const messageContainerRef = useRef<HTMLDivElement>(null);
  const loadRoom = async () => {
    const res = await fetch("http://localhost:4000/loadRoom", {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${Cookies.get("Auth_Token")}`,
      },

      method: "POST",
      body: JSON.stringify({ room }),
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
    (user: String, content: String, pictures: String[]) => {
      setMessages([
        ...messages,
        {
          sender:user,
          content,
          pictures
        },
      ]);
    }
  );
  const [messages, setMessages] = useState<message[]>([
  ]);
  useEffect(scrollDown, [messages]);

  return (
    <div
      className="d-flex flex-column overflow-auto"
      style={{ height: "80vh", width: "50vw" }}
    >
      {messages.map((item: message) => (
        <div
          ref={messageContainerRef}
          className={
            item.sender != username
              ? "mt-5 d-flex justify-content-start"
              : "mt-5 d-flex justify-content-end"
          }
        >
          <span
            className={
              item.sender != username
                ? "message-received text-break"
                : "message-sent text-break"
            }
          >
            {item.content + " " + item.sender}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Messages;
