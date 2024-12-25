const express = require("express");
const { WebSocketServer } = require("ws");
const { v4: uuid } = require("uuid");

const app = express();
const port = 8000;

const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const wss = new WebSocketServer({ server });
const rooms = {};

wss.on("connection", (ws) => {
  console.log("a new user joined");
  ws.on("message", (message) => {
    const data = JSON.parse(message);
    console.log("this is the data : - ", data);
    ws.send(JSON.stringify(data));
  });

  ws.on("close", () => {
    console.log("user disconnected");
  });
});
