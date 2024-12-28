const express = require("express");
const { WebSocketServer } = require("ws");
const { v4: uuid } = require("uuid");

const app = express();
const port = 8080;

const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const wss = new WebSocketServer({ server });
const rooms = new Map();

wss.on("connection", (ws) => {
  console.log("new user connected ✅");

  ws.on("message", (message) => {
    const data = JSON.parse(message.toString());
    console.log("data : ",data);

    // logic to create a new room.
    if(data.type == "create_room"){
      const roomId = uuid();
    }



    // logic to create a new room.
    if(data.type == "join_room"){

    }
  });



  ws.on("close", () => {
    console.log("user disconnected");
  });
});
