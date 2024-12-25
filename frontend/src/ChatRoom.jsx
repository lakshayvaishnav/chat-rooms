// import { useRef, useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
// import "./App.css";
// import { useEffect } from "react";

// function App() {
//   const [count, setCount] = useState(0);
//   const [messages, setmessages] = useState([]);
//   const [inputMessage, setinputMessage] = useState("");
//   const ws = useRef(null);

//   useEffect(() => {
//     ws.current = new WebSocket("ws://localhost:8000");

//     // on connection we sent a message to the ws
//     ws.current.onopen = () => {
//       console.log("connected to the server");
//       ws.current.send(JSON.stringify({ message: "a new user joined : ⚡" }));
//     };

//     // here we are listening for any incoming messages
//     ws.current.onmessage = (event) => {
//       console.log(
//         "this is the message received  : ",
//         event.data
//       );
//       setmessages((prev) => [...prev, { message: event.data }]);
//     };

//     // here disconnection is handled
//     ws.current.onclose = () => {
//       console.log("user disconnected");
//     };
//     return () => {
//       ws.current?.close();
//     };
//   }, []);

//   const handleMessageSubmit = () => {
//     if (inputMessage.trim() !== "") {
//       ws.current.send(JSON.stringify({ message: inputMessage }));
//       setmessages((prev) => [...prev, { message: inputMessage }]);
//       setinputMessage("");
//     }
//   };

//   return (
//     <>
//       <div>
//         <h1>this is the messaging app</h1>
//         <div>
//           <input
//             onChange={(e) => setinputMessage(e.target.value)}
//             type="text"
//           />
//           <button onClick={handleMessageSubmit}>send</button>
//         </div>
//       </div>

//       <div>
//         <h1>messages sent on the server</h1>
//         <p>{`message : ${messages}`}</p>
//       </div>
//     </>
//   );
// }

// export default App;

import React from 'react'

function ChatRoom() {
  return (
    <div>ChatRoom</div>
  )
}

export default ChatRoom