const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 3000;

console.log('Socket.IO server başladılır...');

io.on('connection', (socket) => {
  console.log('Yeni istifadəçi qoşuldu:', socket.id);

  socket.on('message', (data) => {
    console.log('Mesaj alındı:', data);
    io.emit('message', data);
  });

  socket.on('disconnect', () => {
    console.log('İstifadəçi ayrıldı:', socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Server ${PORT} portunda işləyir`);
});
