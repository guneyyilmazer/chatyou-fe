import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from "js-cookie";
import { useMemo, useState } from "react";

type rooms = [{ name: string }];
const Rooms = () => {
  const [page, setPage] = useState(1);
  const [amount, setAmount] = useState(8);
  const [rooms, setRooms] = useState<rooms>();
  const [loadedAll, setLoadedAll] = useState(false);
  const loadRooms = async () => {
    console.log(page);
    const response = await fetch("http://localhost:4000/loadRooms", {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${Cookies.get("Auth_Token")}`,
      },

      method: "POST",
      body: JSON.stringify({ page, amount }),
    });
    const res = await response.json();
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
  useMemo(loadRooms, [page]);
  return rooms ? (
    <div>
      <div className="text-white lead text-center mt-lg-5"> Select A Room </div>
      {rooms!.map((item) => (
        <div
          style={{ cursor: "pointer" }}
          className="text-white bg-danger my-2 rounded-1 py-2 text-center"
          onClick={() => {
            localStorage.setItem("room", item.name);
            window.location.reload();
          }}
        >
          {item.name}
        </div>
      ))}
      <div className="d-flex justify-content-center mt-3">
        <button
          onClick={() => {
            setPage(!(page - 1 < 1) ? page - 1 : page);
            setLoadedAll(false);
          }}
          className="btn btn-light mx-2"
        >
          <FontAwesomeIcon icon={faAngleLeft} />
        </button>
        <button
          onClick={() => setPage(!loadedAll ? page + 1 : page)}
          className="btn btn-light mx-2"
        >

          <FontAwesomeIcon icon={faAngleRight} />

        </button>
      </div>
    </div>
  ) : (
    <div></div>
  );
};

export default Rooms;
