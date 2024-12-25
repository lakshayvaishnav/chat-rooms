import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
const HomeRoom = ({ setuser }) => {
  const [username, setusername] = useState("");
  const [avatar, setavatar] = useState("");

  const navigate = useNavigate();

  
  const handleCreateRoom = () => {
      setavatar("some");
      if (!username) return alert("please type the username");
      setuser({ username, avatar });
      const roomId = uuidv4();
      console.log("roomId : ", roomId);
      // navigate(`/chat/${roomId}`);
    };
    const handleJoinRoom = () => {
      setavatar("some");
    if(!username) return alert("please enter the username")
    setuser({username,avatar})
    console.log("user : ",username, avatar)
    // navigate(`/chat/${roomId}`);
  }

  return (
    <div>
      <div>
        <h1>Welcome to the chat rooms</h1>
        <p>Create your own chat room or join the others</p>
      </div>

      <div>
        <p>Please enter the username...</p>
      </div>
      <div>
        <input onChange={(e)=> setusername(e.target.value)} type="text" placeholder="username" />
        <button onClick={handleCreateRoom}>Create a new room</button>
      </div>

      <div>
        <input type="text" placeholder="enter the room id" />
        <button onClick={handleJoinRoom}>Join a new room</button>
      </div>
    </div>
  );
};

export default HomeRoom;
