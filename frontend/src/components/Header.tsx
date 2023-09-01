import { Outlet } from "react-router-dom";
const Header = () => {
  return (
    <div className="bg-danger">
      <nav className="d-flex justify-content-between "
      style={{height:"5vh"}}>
        <div className="btn-group">
          <button className="btn btn-danger">Home</button>
        </div>
        <div className="">
          <button
            className="btn btn-danger mx-1"
            onClick={() => {
              localStorage.removeItem("room");
              window.location.reload();
            }}
          >
            Exit Room
          </button>
          <button
            className="btn btn-danger mx-1"
            onClick={() => {
              localStorage.removeItem("Auth_Token");
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
