const http = require("http");
const { Server } = require("socket.io");

const app = require("./app");
const { connectDatabase } = require("./config/db");
const { PORT, MONGODB_URI, CLIENT_ORIGIN } = require("./config/env");
const { registerChatHandlers } = require("./sockets/chatHandlers");

async function startServer() {
  await connectDatabase(MONGODB_URI);

  const server = http.createServer(app);
  const io = new Server(server, {
    cors: {
      origin: CLIENT_ORIGIN,
      methods: ["GET", "POST"],
    },
  });

  registerChatHandlers(io);

  server.listen(PORT, () => {
    console.log(`[SERVER] http://localhost:${PORT}`);
  });
}

startServer().catch((error) => {
  console.error("[BOOT] Failed to start server:", error.message);
  process.exit(1);
});
