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
      const { roomId } = data.payload;
      console.log("⚠️ the room id is : ", roomId);
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
      ws.send(
        JSON.stringify({ type: "message", payload: `Joined room ${roomId}` })
      );

      // Broadcasting the message to each client except the current client
      console.log("✅ sending message to each clients");
      roomClients.forEach((client) => {
        if (client !== ws) {
          client.send(
            JSON.stringify({
              type: "message",
              payload: "a new user joined the room",
            })
          );
          console.log("new user joined the room ");
        }
      });

      ws.on("close", () => {
        // if 0 websocket connections the delete the room.
        roomClients.delete(ws);
        if (roomClients.size == 0) {
          rooms.delete(roomId);
        }
      });
    }

    //Broadcasting the message to the room.
    if (data.type == "message") {
      const { roomId, message } = data.payload;
      if (!rooms.has(roomId)) {
        ws.send(JSON.stringify({ type: "error", payload: "invalid room Id" }));
        console.log("⚠️ invalid room Id");
        return;
      }
      // getting all the clients
      const roomClients = rooms.get(roomId);
      roomClients.forEach((client) => {
        client.send(JSON.stringify({ type: "message", payload: message }));
        console.log("message sent to clinet : ", client);
      });
    }
  });

  ws.on("close", () => {
    console.log("user disconnected");
  });
});
