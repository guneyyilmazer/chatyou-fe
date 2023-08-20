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
        <div
          className="bg-danger d-flex justify-content-start text-break p-2 my-2"
          style={{ borderRadius: "15px", borderBottomLeftRadius: "0px" }}
        >
          <span>{item.content.message + " " + item.sender.username}</span>
        </div>
      ))}
    </div>
  );
};

export default Messages;
