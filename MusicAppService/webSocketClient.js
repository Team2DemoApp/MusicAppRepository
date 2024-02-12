const WebSocket = require("ws");
const socket = new WebSocket("ws://localhost:3002");
socket.on("open", () => {
  console.log("Connected to server");
  socket.send("Hello, server!");
});
socket.on("message", message => {
  console.log(`Received from server: ${message}`);
});
socket.on("close", () => {
  console.log("Connection closed");
});
