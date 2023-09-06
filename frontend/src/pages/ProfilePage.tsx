import { useState, useMemo } from "react";
import NotFound404 from "../pages/NotFound404";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import MyProfilePage from "../components/MyProfilePage";
const ProfilePage = () => {
  const { username } = useParams();
type user = {
    username:string,
    profilePicture:string,
    id:string
}
type client= {
    userId:string
}
  const [user, setUser] = useState<user>();
  const [client, setClient] = useState<client>();
  const getUserData = async () => {
    const res = await fetch("http://localhost:4000/user/loadUser", {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${Cookies.get("Auth_Token")}`,
      },
      method: "POST",
      body: JSON.stringify({
        username,
      }),
    });

    const user = await res.json();
    setUser(user);

    const response = await fetch("http://localhost:4000/verify", {
      headers: {
        "Content-Type": "application/json",
      },

      method: "POST",
      body: JSON.stringify({ token: Cookies.get("Auth_Token") }),
    });
    const client = await response.json();
    setClient(client);
  };

  useMemo(getUserData, []);

  return <div className="text-white d-flex flex-column justify-content-center align-items-center">
  {(user && client) &&<>
  <img src={user.profilePicture} style={{ width: "30vw" }} />
    {user.username ? (
    <div className="lead">{user.username}</div>
  ) : (
    <NotFound404 />
  )}

  {user.id &&
    (user.id == client.userId ? (
      <MyProfilePage/>
    ) : (
      <button
      className="btn btn-dark"
        onClick={() => {
          localStorage.setItem("chattingWith", user.username);
          localStorage.removeItem("room")
          window.location.replace("/")
        }}
      >
        Send a message
      </button>
    ))}
    
    
    </>}
  
</div>
};

export default ProfilePage;
