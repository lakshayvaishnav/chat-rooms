import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ChatRoom from "./ChatRoom";
import HomeRoom from "./HomeRoom";
import { useState } from "react";
function App() {
  const [user, setuser] = useState(null); // {username , avatar}

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeRoom setuser={setuser} />} />
        <Route path="/chat" element={<ChatRoom user={user} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
