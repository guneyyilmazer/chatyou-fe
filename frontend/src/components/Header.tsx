import Cookies from "js-cookie";
import { Outlet } from "react-router-dom";
const Header = () => {
  return (
    <div>
      <nav className="d-flex justify-content-between "
      style={{height:"5vh"}}>
        <div className="btn-group">
          <button onClick={()=>window.location.replace("/")} className="btn btn-danger">Home</button>
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
