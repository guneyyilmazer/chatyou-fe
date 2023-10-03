import { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import getBase64 from "./GetBase64";
const SendMessage = () => {
  const socket = useSelector((shop: any) => shop.app.socket); //will implement the type later

  const room = useSelector((shop: any) => shop.app.room);
  const loadedFirstMessages = useSelector(
    (shop: any) => shop.app.loadedFirstMessages
  );
  const emptyRoom = useSelector((shop: any) => shop.app.emptyRoom);
  const user = useSelector((shop: any) => shop.app.user);
  const chattingWith = useSelector((shop: any) => shop.app.chattingWith);
  const [pictures, setPictures] = useState<String[]>();
  const [inputState, setInputState] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [timer,setTimer] = useState<any>(null)
  const fileRef = useRef<HTMLInputElement>(null);
  const handleTyping = (e: any) => {
    clearTimeout(timer)
    socket.emit("typing",user,room,chattingWith)
    const newTimer = setTimeout(()=>socket.emit("stopped-typing",user,room,chattingWith),1000)
    setTimer(newTimer)

    setInputState(e.target.value);
  };
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const array: String[] = [];
    for (let i = 0; i < e.target.files!.length; i++) {
      const res = await getBase64(e.target.files![i]);
      array.push(res as String);
    }
    setPictures(array);
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if ((inputRef.current?.value || pictures) && user) {
      socket.emit(
        "send-msg",
        user,
        room,
        inputRef.current!.value ? inputRef.current!.value : " ",
        pictures,
        localStorage.getItem("chattingWith")
        );
        inputRef.current!.value = "";
        socket.emit("stopped-typing",user,room,chattingWith)
    }
  };
  return (
    (loadedFirstMessages || emptyRoom) && (

      <form
      onSubmit={handleSubmit}
      className="form-group d-flex justify-content-center"
      >

        <input
          className="form-check col-7 col-md-4 col-lg-3 py-3 rounded-2"
          placeholder={"Send a message to room " + room}
          type="text"
          onChange={handleTyping}
          value={inputState}
          ref={inputRef}
          />
        <button
          className="btn btn-danger ms-2 rounded-3"
          onClick={() => fileRef.current?.click()}
          type="button"
          >
          <FontAwesomeIcon
            style={{ height: "22px", width: "1.5rem", marginTop: "3px" }}
            icon={faImage}
            ></FontAwesomeIcon>
        </button>
        <input
          type="file"
          ref={fileRef}
          multiple
          onChange={handleChange}
          className="d-none"
          />
        <button className="btn btn-danger ms-2 rounded-3" type="submit">
          Send
        </button>
      </form>
    )
  );
};

export default SendMessage;
