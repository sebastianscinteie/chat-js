const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);

let messages = []

let users = new Map();


app.use(cors());

app.get('/socket', (req, res) => {
  if (res.socket.server.io) {
    console.log("Server already created")
    res.end();
    return;
  }
  
  console.log("Creating new server.")
  const io = new Server(server);
  res.socket.server.io = io
  
  io.on("connection", (socket) => {
    console.log("A user connected");
    
    io.emit("server-message", messages);

    socket.on("username", (msg) => {  
      users.set(socket.id, msg);
    });
    
    socket.on("user-message", (msg) => {  
      messages.push(msg);  
      io.emit("server-message", messages);
    });
  
    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });

  res.end()
})

const PORT = process.env.PORT || 42000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});


