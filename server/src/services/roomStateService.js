const { COLORS } = require("../config/constants");
const { sanitizeText } = require("../utils/sanitize");

const onlineUsers = new Map();
const rooms = new Map();

let colorIndex = 0;

function nextColor() {
  const color = COLORS[colorIndex % COLORS.length];
  colorIndex += 1;
  return color;
}

function usersForRoom(room) {
  const roomUsers = rooms.get(room);
  if (!roomUsers) return {};
  return Object.fromEntries(roomUsers);
}

function removeUserFromRoom(user) {
  const roomUsers = rooms.get(user.room);
  if (!roomUsers) return {};

  roomUsers.delete(user.username);
  if (roomUsers.size === 0) {
    rooms.delete(user.room);
    return {};
  }

  return Object.fromEntries(roomUsers);
}

function joinRoom(socketId, payload) {
  const username = sanitizeText(payload?.username, 24, "Anonim");
  const room = sanitizeText(payload?.room, 32, "Genel");

  const previousUser = onlineUsers.get(socketId) || null;
  let previousUsers = null;

  if (previousUser) {
    previousUsers = removeUserFromRoom(previousUser);
  }

  const user = {
    username,
    room,
    color: nextColor(),
  };

  onlineUsers.set(socketId, user);

  if (!rooms.has(room)) {
    rooms.set(room, new Map());
  }

  rooms.get(room).set(username, user.color);

  return {
    user,
    users: usersForRoom(room),
    previousUser,
    previousUsers,
  };
}

function leaveBySocket(socketId) {
  const user = onlineUsers.get(socketId);
  if (!user) return null;

  onlineUsers.delete(socketId);

  return {
    user,
    users: removeUserFromRoom(user),
  };
}

function getUserBySocket(socketId) {
  return onlineUsers.get(socketId) || null;
}

module.exports = {
  joinRoom,
  leaveBySocket,
  getUserBySocket,
};
