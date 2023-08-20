import { message } from "../types/MessageType";
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
        <div className="my-4">
          <span
            className="bg-danger p-2 text-break"
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
