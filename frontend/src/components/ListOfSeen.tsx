import Cookies from "js-cookie";
import {useState} from "react";

const ListOfSeen = ({ users }: any) => {

  
  const [seenList,setSeenList] = useState([{}])
  const getUserData = async (userId: string) => {
    const res = await fetch("http://localhost:4000/user/loadUser", {
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
    return user
  };
  return( <div>
    {users.map(async(item:any) => {
      //@ts-ignore
      setSeenList(...seenList,await getUserData(item.userId));
    })}
  </div>);
};

export default ListOfSeen;
