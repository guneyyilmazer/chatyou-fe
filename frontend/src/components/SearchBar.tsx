import Cookies from "js-cookie";
import { useRef, useState } from "react";
import SearchBarResults from "./SearchBarResults";
import { setUser } from "../features/appSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRepeat } from "@fortawesome/free-solid-svg-icons";

const SearchBar = () => {
  const [searchFor, setSearchFor] = useState("users");
  const [show, setShow] = useState(true);

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
        username:
          usernameInputRef.current!.value != "" &&
          usernameInputRef.current!.value,
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
        room: roomInputRef.current!.value != "" && roomInputRef.current!.value,
      }),
    });
    const response = await res.json();
    console.log(response);
    if (!response.error) {
      setRooms(response.rooms);
    }
  };
  return (
    <div className="">
      <form className="form-group d-flex">
        <input
          ref={searchFor == "users" ? usernameInputRef : roomInputRef}
          onChange={searchFor == "users" ? findUsers : findRoom}
          type="text"
          className="form-check text-white p-1 text-center"
          style={{
            outline: "none",
            background: "none",
            border: "none",
            borderBottom: "2px solid",
            borderColor: "Red",
          }}
          placeholder={`Search for ${searchFor}`}
        />
        <button
          onClick={(e) => {
            setSearchFor(searchFor == "users" ? "rooms" : "users");
            e.preventDefault();
              searchFor == "users" ? setUsers([]) : setRooms([]);
          }}
          className="btn btn-danger rounded-5 ms-2"
        >
          <FontAwesomeIcon icon={faRepeat} />
        </button>
      </form>
      <SearchBarResults
        show={show}
        setShow={setShow}
        users={users}
        rooms={rooms}
      />
    </div>
  );
};

export default SearchBar;
