import { message } from "../types/MessageType";
import { useState,useRef, useEffect } from "react";
import "../css/Messages.css";
const Messages = ({ socket }: any) => {
  const [clientId, setClientId] = useState("user1");
  const messageContainerRef = useRef<HTMLDivElement>(null)
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
          sender: { id: "placeholder", username: "placeholder" }, //will implement right after front end auth implementation
          content: { message: content, pictures },
        },
      ]);
    }
  );
  const [messages, setMessages] = useState<message[]>([
    {
      sender: { id: "user1", username: "Dave" },
      content: { message: "hey", pictures: [] },
    },
    {
      sender: { id: "id", username: "Dave" },
      content: { message: "hey2", pictures: [] },
    },
  ]);
  useEffect(scrollDown,[messages])

  return (
    <div
      className="d-flex flex-column overflow-auto"
      style={{ height: "80vh", width: "50vw" }}
    >
      {messages.map((item: message) => (
        <div
        ref={messageContainerRef}
          className={
            item.sender.id != clientId
              ? "mt-5 d-flex justify-content-start"
              : "mt-5 d-flex justify-content-end"
          }
        >
          <span
            className={
              item.sender.id != clientId
                ? "message-received text-break"
                : "message-sent text-break"
            }
          >
            {item.content.message + " " + item.sender.username}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Messages;
