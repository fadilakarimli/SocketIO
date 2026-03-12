const Message = require("../models/Message");
const { MAX_HISTORY } = require("../config/constants");

async function getRoomHistory(room) {
  const docs = await Message.find({ room })
    .sort({ timestamp: -1 })
    .limit(MAX_HISTORY)
    .lean();

  return docs.reverse().map((doc) => ({
    id: doc.id,
    username: doc.username,
    color: doc.color,
    message: doc.message,
    timestamp: doc.timestamp,
  }));
}

async function saveMessage(payload) {
  await Message.create(payload);
}

async function deleteUserRoomMessages(room, username) {
  await Message.deleteMany({ room, username });
}

module.exports = {
  getRoomHistory,
  saveMessage,
  deleteUserRoomMessages,
};
