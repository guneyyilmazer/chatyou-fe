import React, { useRef } from "react";

const JoinRoom = () => {
  const roomInputRef = useRef<HTMLInputElement>(null);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };
  return (
    <form onSubmit={handleSubmit} className="col-6">
      <div className="form-group d-flex">
        <input
          type="text"
          className="form-control p-3"
          placeholder="Enter Room..."
        />
        <button type="submit" className="btn btn-danger ms-2 px-4">
          {" "}
          Join
        </button>
      </div>
    </form>
  );
};

export default JoinRoom;
