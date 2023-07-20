
const http = require('http');
const { WebSocket, WebSocketServer } = require('ws');


let messages = []

const PORT = process.env.PORT || 42000;

http.createServer((req, res) => {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Request-Method', '*');
	res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
	res.setHeader('Access-Control-Allow-Headers', '*');

  if (req.url == '/socket') {
    if (res.socket.server.wss) {
      console.log("Server already created")
      res.end();
      return;
    }
    
    console.log("Creating new server.")
    const wss = new WebSocketServer({
      server: res.socket.server,
      clientTracking: true,
    });
    res.socket.server.wss = wss
    
    wss.on("connection", (socket) => {
    //   if (messages.length) {
    //     socket.send(messages.slice(-20));
    //   }

      socket.on("message", (msg) => {
        data = JSON.parse(msg);
        console.log(data);
        if ('username' in data && socket.username != data.username) {
          socket.username = data.username;
        }
        if (!'message' in data) {
          console.log('No message field in message from client.');
          return;
        }
        if (!'time' in data) {
          console.log('No time field in message from client.');
          return;
        }

        messages.push(data.message);

        wss.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(data));
          }
        });
      });
    });
  }
  
  res.end();
}).listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

