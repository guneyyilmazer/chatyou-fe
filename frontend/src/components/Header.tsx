import Cookies from "js-cookie";
import { Outlet } from "react-router-dom";
import SearchBar from "./SearchBar";
import { useSelector,useDispatch } from "react-redux";
import { setRoom,setChattingWith } from "../features/appSlice";

const Header = () => {
  const dispatch = useDispatch()
  const room = useSelector((shop: any) => shop.app.room); //will implement the type later
  const chattingWith = useSelector((shop: any) => shop.app.chattingWith); //will implement the type later
  return (
    <div>
      <nav className="d-flex justify-content-between" style={{ height: "5vh" }}>
        <div className="btn-group">
          <button
            onClick={() => {
              room && setRoom(""); localStorage.setItem("room","")
              chattingWith&& setChattingWith(""); localStorage.setItem("chattingWith","")
              window.location.replace("/");

            }}
            className="btn btn-danger"
          >
            Home
          </button>
        </div>
        <div
          className="position-absolute start-50 "
          style={{ transform: "translate(-50%,0%)" }}
        >
          <SearchBar />
        </div>
        <div className="">
          <button
            className="btn btn-danger mx-1"
            onClick={() => {
              localStorage.removeItem("room");
              localStorage.removeItem("chattingWith");
              window.location.reload();
            }}
          >
            Exit Room
          </button>
          <button
            className="btn btn-danger mx-1"
            onClick={() => {
              Cookies.remove("Auth_Token");
              window.location.reload();
            }}
          >
            Logout
          </button>
        </div>
      </nav>

      <Outlet />
    </div>
  );
};

export default Header;
