const express = require("express");
const app = express();
const socket = require("socket.io");
const cors = require("cors");

app.use(cors());

server = app.listen(8080, function () {
  console.log("server is running on port 8080");
});

let io = socket(server, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  console.log(socket.id, "has connected");

  socket.on("SEND_MESSAGE", (data) => {
    io.emit("RECEIVE_MESSAGE", data);
  });
});
