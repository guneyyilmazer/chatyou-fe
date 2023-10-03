import { Link } from "react-router-dom";
import "../css/SearchBar.css";

const DefaultProfilePicture = require("../images/default.jpeg");

const SearchBarResults = ({
  users,
  rooms,
  searchFor,
  show,
  setShow,
  userNotFound,
  roomNotFound,
}: any) => {
  return (
    show && (
      <div className="bg-dark text-white">
        {searchFor == "users" &&
          (!userNotFound ? (
            users.map((item: any, index: number) => (
              <Link
                key={index}
                reloadDocument
                className=" results d-flex py-3 ps-2 align-items-center text-decoration-none"
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
            ))
          ) : (
            <div className="text-center py-2">No results.</div>
          ))}
        {searchFor == "rooms" &&
          (!roomNotFound ? (
            rooms.map((item: any, index: number) => (
              <div
                key={index}
                onClick={() => {
                  setShow(!show);
                  localStorage.setItem("room", item.name);

                  window.location.replace("/");
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
            ))
          ) : (
            <div className="text-center py-2">No results.</div>
          ))}
      </div>
    )
  );
};

export default SearchBarResults;
