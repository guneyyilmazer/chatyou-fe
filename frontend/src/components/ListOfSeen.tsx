import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import {useEffect, useState } from "react";
import {user} from '../types/UserType'
const DefaultProfilePicture = require("../images/default.jpeg")
const ListOfSeen = ({ users, showSeen, setShowSeen }: any) => {
  const [count, setCount] = useState(users.length);

  const handleUserKeyPress = (event: KeyboardEvent) => {
    if (event.key == "Escape") {
      setShowSeen(!showSeen);
    }
  };
  useEffect(() => {
    window.addEventListener("keydown", handleUserKeyPress);
    return () => {
      window.removeEventListener("keydown", handleUserKeyPress);
    };
  }, [handleUserKeyPress]);
  return (
    <div
      style={{ height: "100vh", width: "100vw" }}
      className="bg-dark position-relative text-white position-absolute top-0 start-0"
    >
      {users && (
        <div className="d-flex flex-column">
          <span className="lead fs-2 my-4 text-center">
            Seen By {count} {count == 1 ? "User" : "Users"}
          </span>
          <div className="d-flex justify-content-center align-items-center flex-column">

          {users.map((item: user,index:number) => {
            return (
              <div key={index} className="d-flex col-1 my-1 flex-wrap justify-content-start align-items-center text-white">

                <Link
                  className="d-flex text-decoration-none text-white align-items-center"
                  to={`/users/${item.userId}`}
                  >
                  <img
                    className="rounded-5"
                    style={{ height: "40px", width: "40px" }}
                    src={item.profilePicture ? item.profilePicture : DefaultProfilePicture}
                    alt=""
                    />
                  <span className="ms-1">{item.username}</span>{" "}
                </Link>
              </div>
            );
          })}
          </div>

        </div>
      )}
      <button
        onClick={() => setShowSeen(!showSeen)}
        className="btn btn-danger position-absolute top-0 end-0"
      >
        <FontAwesomeIcon icon={faX} />
      </button>
    </div>
  );
};

export default ListOfSeen;
