const {
  getRoomHistory,
  saveMessage,
  deleteUserRoomMessages,
} = require("../services/messageService");
const {
  joinRoom,
  leaveBySocket,
  getUserBySocket,
} = require("../services/roomStateService");
const { sanitizeText } = require("../utils/sanitize");

function createMessageId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

function registerChatHandlers(io) {
  io.on("connection", (socket) => {
    console.log(`[+] ${socket.id} connected`);

    socket.on("join_room", async (payload) => {
      const currentUser = getUserBySocket(socket.id);
      if (currentUser) {
        socket.leave(currentUser.room);
      }

      const { user, users, previousUser, previousUsers } = joinRoom(
        socket.id,
        payload
      );

      if (previousUser) {
        try {
          await deleteUserRoomMessages(previousUser.room, previousUser.username);
        } catch (error) {
          console.error("[DB] Could not delete previous room messages:", error.message);
        }

        io.to(previousUser.room).emit("user_left", {
          username: previousUser.username,
          users: previousUsers || {},
          timestamp: Date.now(),
        });
      }

      socket.join(user.room);

      let history = [];
      try {
        history = await getRoomHistory(user.room);
      } catch (error) {
        console.error("[DB] Could not read room history:", error.message);
      }

      socket.emit("room_ready", {
        room: user.room,
        users,
        myColor: user.color,
        history,
      });

      io.to(user.room).emit("user_joined", {
        username: user.username,
        color: user.color,
        users,
        timestamp: Date.now(),
      });

      console.log(`[JOIN] ${user.username} -> #${user.room}`);
    });

    socket.on("send_message", async ({ message }) => {
      const user = getUserBySocket(socket.id);
      const cleanMessage = sanitizeText(message, 800);

      if (!user || !cleanMessage) return;

      const payload = {
        id: createMessageId(),
        room: user.room,
        username: user.username,
        color: user.color,
        message: cleanMessage,
        timestamp: Date.now(),
      };

      try {
        await saveMessage(payload);
      } catch (error) {
        console.error("[DB] Could not save message:", error.message);
      }

      io.to(user.room).emit("receive_message", payload);
    });

    socket.on("typing", (isTyping) => {
      const user = getUserBySocket(socket.id);
      if (!user) return;

      socket.to(user.room).emit("typing_update", {
        username: user.username,
        color: user.color,
        isTyping,
      });
    });

    socket.on("disconnect", async () => {
      const result = leaveBySocket(socket.id);
      if (!result) return;

      try {
        await deleteUserRoomMessages(result.user.room, result.user.username);
      } catch (error) {
        console.error("[DB] Could not delete user messages on disconnect:", error.message);
      }

      io.to(result.user.room).emit("user_left", {
        username: result.user.username,
        users: result.users,
        timestamp: Date.now(),
      });

      console.log(`[-] ${result.user.username} left`);
    });
  });
}

module.exports = {
  registerChatHandlers,
};
