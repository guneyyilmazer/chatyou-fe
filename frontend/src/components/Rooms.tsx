import Cookies from "js-cookie";
import { useMemo, useState } from "react";

type rooms = [{ name: string }];
const Rooms = () => {
  const [rooms, setRooms] = useState<rooms>();
  const loadRooms = async () => {
    const response = await fetch("http://localhost:4000/loadRooms", {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${Cookies.get("Auth_Token")}`,
      },

      method: "POST",
      body: JSON.stringify({ page: 1, amount: 8 }),
    });
    const { rooms } = await response.json();
    console.log(rooms);
    setRooms(rooms);
  };
  useMemo(loadRooms, []);
  return (
    rooms ? (
        <div>
          <div className="text-white lead text-center"> Select A Room </div>
        {rooms!.map((item) => (
          <div
          style={{cursor:"pointer"}}
          className="text-white bg-danger my-2 rounded-1 py-2 text-center"
            onClick={() => {
              localStorage.setItem("room", item.name);
              window.location.reload()
            }}
          >
            {item.name}
          </div>
        ))}
      </div>
    ):<div>as</div>
  );
};

export default Rooms;
