import { message } from "../types/MessageType";
import '../css/Messages.css'
const Messages = () => {
  const list: message[] = [
    {
      sender: { id: "id", username: "Dave" },
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
        <div className="mt-5 d-flex">
          <span
            className="message-received text-break"
            style={{ borderRadius: "15px", borderBottomLeftRadius: "0px" }}
          >
            {item.content.message + " " + item.sender.username}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Messages;
