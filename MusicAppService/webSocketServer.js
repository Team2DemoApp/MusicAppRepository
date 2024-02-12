const WebSocket = require("ws");
const server = new WebSocket.Server({ port: 3002 });
server.on("connection", socket => {
  console.log("Client connected");
  socket.on("message", message => {
    console.log(`Received from client: ${message}`);
    socket.send(`Hi Client, you said: ${message}`); //single client

    // const eventInterval = setInterval(() => {
    //   if (socket.readyState === WebSocket.OPEN) {
    //     socket.send("New event: You have a new notification!");
    //   }
    // }, 5000);
  });
  socket.on("close", () => {
    console.log("Client disconnected");
  });
});
