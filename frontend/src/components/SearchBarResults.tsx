import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import "../css/SearchBar.css";
const DefaultProfilePicture = require("../images/default.jpeg");

const SearchBarResults = ({ users, rooms, searchFor, show, setShow }: any) => {
  return (
    <div className="bg-dark">
      {users &&
        searchFor == "users" &&
        users.map((item: any) => (
          <Link
            className=" results d-flex py-3 ps-2 align-items-center text-decoration-none"
            onClick={() => setShow(!show)}
            to={`users/${item._id}`}
          >
            <img
              style={{ height: "40px", width: "40px" }}
              className="rounded-3"
              src={
                item.profilePicture
                  ? item.profilePicture
                  : DefaultProfilePicture
              }
            />
            <span className="ms-2 text-white text-decoration-none">
              {item.username}
            </span>
          </Link>
        ))}
      {rooms &&
        searchFor == "rooms" &&
        rooms.map((item: any) => (
          <div
            onClick={() => {
              setShow(!show);
              localStorage.setItem("room", item.name);

              window.location.reload();
            }}
            className="results d-flex py-3 ps-2 align-items-center"
          >
            <span className="text-decoration-none">
              <span
                style={{
                  textDecoration: "none",
                  background: "none",
                  border: "none",
                }}
                className="ms-2 text-white text-decoration-none"
              >
                {item.name}
              </span>
            </span>
          </div>
        ))}
    </div>
  );
};

export default SearchBarResults;
