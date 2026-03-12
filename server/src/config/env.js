require("dotenv").config();

const PORT = Number(process.env.PORT) || 3001;
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/socket-chat";
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:5173";

module.exports = {
  PORT,
  MONGODB_URI,
  CLIENT_ORIGIN,
};
