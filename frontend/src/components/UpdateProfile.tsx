import React, { useState } from "react";
import UpdateProfilePicture from "./UpdateProfilePicture";

const UpdateProfile = () => {
  const [index, setIndex] = useState(0);
  return (
    <div>
      {index == 0 && (
        <div
          className="btn-group d-flex flex-column row  bg-dark gy-3 mt-5"
          style={{ width: "25vw", height: "40vh" }}
        >
          <div className="text-center lead">Update Profile</div>
          <button onClick={() => setIndex(1)} className="btn btn-dark p-3">
            Update Profile Photo
          </button>
          <button onClick={() => setIndex(2)} className="btn btn-dark p-3">
            Update Username
          </button>
          <button onClick={() => setIndex(3)} className="btn btn-dark p-3">
            Change Email
          </button>
        </div>
      )}
      {index == 1 && (
        <div>
          <UpdateProfilePicture />
        </div>
      )}{" "}
      {/* will implement update username and change email */}
    </div>
  );
};

export default UpdateProfile;
