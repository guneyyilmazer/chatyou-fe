import Cookies from "js-cookie";
import { useRef, useState } from "react";
import SearchBarResults from "./SearchBarResults";
import { setUser } from "../features/appSlice";

const SearchBar = () => {
  const [searchFor, setSearchFor] = useState("users");
  const usernameInputRef = useRef<HTMLInputElement>(null);
  const roomInputRef = useRef<HTMLInputElement>(null);
  const [rooms, setRooms] = useState([]);
  const [users, setUsers] = useState([]);

  const findUsers = async () => {
    const res = await fetch("http://localhost:4000/user/findUsers", {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${Cookies.get("Auth_Token")}`,
      },

      method: "POST",
      body: JSON.stringify({
        username: usernameInputRef.current!.value,
      }),
    });
    const response = await res.json();
    console.log(response);
    if (!response.error) {
      setUsers(response.users);
    }
  };
  const findRoom = async () => {
    const res = await fetch("http://localhost:4000/findRoom", {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${Cookies.get("Auth_Token")}`,
      },

      method: "POST",
      body: JSON.stringify({
        room: roomInputRef.current!.value,
      }),
    });
    const response = await res.json();
    console.log(response);
    if (!response.error) {
      setRooms(response.rooms);
    }
  };
  return (
    <div>


    <form className="form-group d-flex">
      <input
        ref={searchFor == "users" ? usernameInputRef : roomInputRef}
        onChange={searchFor == "users" ? findUsers : findRoom}
        type="text"
        className="form-check p-1 text-center"
        placeholder="Search"
        />
      Search
    </form>
    <SearchBarResults users={users} rooms={rooms}/>
        </div>
  );
};

export default SearchBar;
