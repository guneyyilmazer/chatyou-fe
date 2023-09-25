import Cookies from "js-cookie";
import { Outlet } from "react-router-dom";
import SearchBar from "./SearchBar";
import { useSelector,useDispatch } from "react-redux";
import { setRoom,setChattingWith } from "../features/appSlice";
import withAuth from "./Auth";
import Navbar from "./Navbar";

const Header = () => {
  
  return (
    <div>

      <Navbar/>
      <Outlet />
    </div>
  );
};

export default Header;
