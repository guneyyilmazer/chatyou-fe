import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setRoom } from "../features/appSlice";
import {room} from '../types/AllTypes'
const Rooms = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [amount, setAmount] = useState(8);
  const [rooms, setRooms] = useState<room[]>();
  const [loadedAll, setLoadedAll] = useState(false);
  const loadRooms = async () => {
    const response = await fetch("http://localhost:4000/loadRooms", {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${Cookies.get("Auth_Token")}`,
      },

      method: "POST",
      body: JSON.stringify({ page, amount }),
    });
    const res = await response.json();
    if (res.loadedAll) {
      setLoadedAll(true);
    }
    if (res.rooms.length < amount) {
      if (res.rooms.length == 0) {
        setLoadedAll(true);
      }
      setRooms(res.rooms);
      setLoadedAll(true);
    } else {
      setRooms(res.rooms);
    }
  };
  useEffect(()=>{loadRooms()}, [page]);
  return rooms && rooms.length != 0 ? (
    <div>
      <div className="text-white lead text-center mt-lg-5"> Select A Room </div>
      {rooms!.map((item, index) => (
        <div
          key={index}
          style={{ cursor: "pointer" }}
          className="text-white bg-danger my-2 rounded-1 py-2 text-center"
          onClick={() => {
            dispatch(setRoom(item.name));
          }}
        >
          {item.name}
        </div>
      ))}
      <div className="d-flex justify-content-center mt-3">
        <button
          onClick={() => {
            //if page won't equal to 0 when we substract 1 then change state
            setPage(!(page - 1 < 1) ? page - 1 : page);
            page != 1 && setLoadedAll(false);
          }}
          className="btn btn-light mx-2"
        >
          <FontAwesomeIcon icon={faAngleLeft} />
        </button>
        <span className="text-white d-flex align-items-center">{page}</span>
        <button
          onClick={() => setPage(!loadedAll ? page + 1 : page)}
          className="btn btn-light mx-2"
        >
          <FontAwesomeIcon icon={faAngleRight} />
        </button>
      </div>
    </div>
  ) : rooms ? (
    <div className="lead text-white text-center">
      No rooms available, create one and start chatting!
    </div>
  ) : (
    <></>
  );
};

export default Rooms;
