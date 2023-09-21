import Cookies from "js-cookie";
import { useRef, useState } from "react";

const SearchBar = () => {
  const [searchFor, setSearchFor] = useState("users");
  const usernameInputRef = useRef<HTMLInputElement>(null);
  const roomInputRef = useRef<HTMLInputElement>(null);
  const [results, setResults] = useState([]);
  console.log(results)

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
      setResults(response);
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
      setResults(response);
    }
  };
  return (
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
  );
};

export default SearchBar;
