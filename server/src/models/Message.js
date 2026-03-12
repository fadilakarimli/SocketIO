const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    room: {
      type: String,
      required: true,
      index: true,
    },
    username: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    timestamp: {
      type: Number,
      required: true,
      index: true,
    },
  },
  {
    versionKey: false,
  }
);

messageSchema.index({ room: 1, timestamp: -1 });

module.exports = mongoose.model("Message", messageSchema);
