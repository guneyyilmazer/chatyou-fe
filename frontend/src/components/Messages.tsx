const Messages = () => {
  type message = {
    sender: { id: String; username: String };
    content: { message: String; pictures?: String[] };
  };
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
    <div className="d-flex flex-column col-6" style={{}}>
      {list.map((item) => (
        <span
          className="bg-danger flex-wrap text-break p-2 my-2"
          style={{ borderRadius: "15px", borderBottomLeftRadius: "0px" }}
        >
          {item.content.message + " " + item.sender.username}
        </span>
      ))}
    </div>
  );
};

export default Messages;
