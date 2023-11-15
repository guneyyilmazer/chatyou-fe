import { ChangeEvent, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import getBase64 from "./GetBase64";
import reduceBase64Size from "./ReduceBase64Size";
const SendMessage = () => {
  const socket = useSelector((shop: any) => shop.app.socket); //will implement the type later
  const room = useSelector((shop: any) => shop.app.room);
  const loadedFirstMessages = useSelector(
    (shop: any) => shop.app.loadedFirstMessages
  );
  const emptyRoom = useSelector((shop: any) => shop.app.emptyRoom);
  const user = useSelector((shop: any) => shop.app.user);
  const chattingWith = useSelector((shop: any) => shop.app.chattingWith);

  const [pictures, setPictures] = useState<string[]>();
  const [inputState, setInputState] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [timer, setTimer] = useState<any>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleTyping = (e: ChangeEvent<HTMLInputElement>) => {
    clearTimeout(timer);
    socket.emit("typing", user, room, chattingWith);
    const newTimer = setTimeout(
      () => socket.emit("stopped-typing", user, room, chattingWith),
      700
    );
    setTimer(newTimer);

    setInputState(e.target.value);
  };
  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const array: string[] = [];
    for (let i = 0; i < e.target.files!.length; i++) {
      const res = await getBase64(e.target.files![i]);
      const reducedSize = await reduceBase64Size(res);
      array.push(reducedSize);
    }
    setPictures(array);
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if ((inputRef.current?.value || pictures?.length!=0) && user) {
      socket.emit(
        "send-msg",
        user,
        room,
        inputRef.current!.value ? inputRef.current!.value : " ",
        pictures,
        chattingWith
      );
      setPictures([])
      inputRef.current!.value = "";
      socket.emit("stopped-typing", user, room, chattingWith);
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
