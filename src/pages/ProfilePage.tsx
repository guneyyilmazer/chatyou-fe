import { useState, useEffect } from "react";
import NotFound404 from "../pages/NotFound404";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import MyProfilePage from "../components/MyProfilePage";
import { useDispatch } from "react-redux";
import { setChattingWith, setRoom } from "../features/appSlice";
import { BACKEND_PORT, IP } from "..";
const DefaultProfilePicture = require("../images/default.jpeg");

const ProfilePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userId } = useParams();
  type user = {
    username: string;
    profilePicture: string;
    userId: string;
  };
  type client = {
    userId: string;
  };
  const [user, setUser] = useState<user>();
  const [client, setClient] = useState<client>();
  const getUserData = async () => {
    const res = await fetch(IP.concat(`${BACKEND_PORT}/user/loadUser`), {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${Cookies.get("Auth_Token")}`,
      },
      method: "POST",
      body: JSON.stringify({
        userId,
      }),
    });

    const user = await res.json();
    setUser(user);

    const response = await fetch(IP.concat(`${BACKEND_PORT}/verify`), {
      headers: {
        "Content-Type": "application/json",
      },

      method: "POST",
      body: JSON.stringify({ token: Cookies.get("Auth_Token") }),
    });
    const client = await response.json();
    setClient(client);
  };

  useEffect(()=>{getUserData()}, [userId]);
  return (
    <div className="text-white mt-5 d-flex flex-column justify-content-center align-items-center">
      {user && client && (
        <>
          <img
            src={
              user.profilePicture ? user.profilePicture : DefaultProfilePicture
            }
            className="rounded-4 col-6 col-md-3"
          />
          {user.username ? (
            <div className="lead mt-2">{user.username}</div>
          ) : (
            <NotFound404 />
          )}

          {user.userId &&
            (user.userId == client.userId ? (
              <MyProfilePage />
            ) : (
              <button
                className="btn btn-danger mt-2"
                onClick={() => {
                  dispatch(setChattingWith(user.userId));
                  dispatch(setRoom(""));
                  navigate("/");
                }}
              >
                Send a message
              </button>
            ))}
        </>
      )}
    </div>
  );
};

export default ProfilePage;
