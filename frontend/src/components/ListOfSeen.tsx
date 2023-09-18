import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useState } from "react";

const ListOfSeen = ({ users, showSeen, setShowSeen }: any) => {
  const [count,setCount] = useState(0)
  return (
    <div
      style={{ height: "100vh", width: "100vw" }}
      className="bg-dark position-relative text-white position-absolute top-0 start-0"
    >
      
      {users && (
        <div className="d-flex flex-column">
          <span className="lead fs-2 my-4 text-center">Seen By {count + 1} Users</span>
          {users.map((item: any,index:number) => {
            count != index && setCount(index);
            return (
              <div className="d-flex flex-wrap justify-content-center align-items-center text-white">
                <Link
                  className="d-flex text-decoration-none text-white align-items-center"
                  to={`/users/${item.userId}`}
                >
                  <img
                    className="rounded-5"
                    style={{ height: "40px", width: "40px" }}
                    src={item.profilePicture}
                    alt=""
                  />
                  <span className="ms-1">{item.username}</span>{" "}
                </Link>
              </div>
            );
          })}
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
