import React from "react";
import { useParams } from "react-router-dom";

function ChatRoom({ user }) {
  const roomId = useParams();
  console.log("roomId : ", roomId.roomId);
  return (
    <>
      <div>ChatRoom : {roomId.roomId}</div>
      <div>user : {user.username}</div>
    </>
  );
}

export default ChatRoom;
