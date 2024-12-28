import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ChatRoom from "./ChatRoom";
import HomeRoom from "./HomeRoom";
import { useState } from "react";
function App() {
  const [user , setUser] = useState(null);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeRoom  setUser={setUser}/>} />
        <Route path="/chat/:roomId" element={<ChatRoom  user={user}/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
