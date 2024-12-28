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

/*
creating a room : -
  1.new room uuid.
  2.add this room to map (rooms) with socket connection.
  3.send the message to the client new room created with giving the roomId.

joining a room : -
  1.extracting the roomId from payload.
  2.check if that room exist in the data strucutres.
  3.Broadcast a message in that room that a new user joined.
*/

wss.on("connection", (ws) => {
  console.log("new user connected ✅");

  ws.on("message", (message) => {
    const data = JSON.parse(message.toString());
    console.log("data : ", data);

    // logic to create a new room.
    if (data.type == "create_room") {
      const roomId = uuid();
      console.log("new room created : ", roomId);

      rooms.set(roomId, new Set([ws]));
      ws.send(
        JSON.stringify({ type: "message", payload: `Room created : ${roomId}` })
      );
    }

    // logic to join a new room.
    if (data.type == "join_room") {
      const { roomId } = data.payload.roomId;
      if (!rooms.has(roomId)) {
        ws.send(
          JSON.stringify({ type: "Error", payload: "Room Id not found" })
        );
        console.log("⚠️ room id not found");
        return;
      }
      // get all the users in this particular room.
      const roomClients = rooms.get(roomId);

      // add current user too.
      roomClients.add(ws);

      // Broadcasting the message to each client except the current client
      roomClients.forEach((client) => {
        if (client !== ws) {
          ws.send(
            JSON.stringify({
              type: "message",
              payload: "a new user joined the room",
            })
          );
          console.log("new user joined the room ");
        }
      });
    }
  });

  ws.on("close", () => {
    console.log("user disconnected");
  });
});
