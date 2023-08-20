import { message } from "../types/MessageType";
import { useState } from "react";
import "../css/Messages.css";
const Messages = () => {
  const [clientId, setClientId] = useState("user1");

  const list: message[] = [
    {
      sender: { id: "user1", username: "Dave" },
      content: { message: "hey", pictures: [] },
    },
    {
      sender: { id: "id", username: "Dave" },
      content: { message: "hey2", pictures: [] },
    },
  ];
  return (
    <div className="col-8" style={{}}>
      {list.map((item) => (
        <div className={
            item.sender.id != clientId
              ? "mt-5 d-flex justify-content-start"
              : "mt-5 d-flex justify-content-end"
          }>
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
