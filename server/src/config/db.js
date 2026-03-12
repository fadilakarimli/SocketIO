const mongoose = require("mongoose");

async function connectDatabase(uri) {
  await mongoose.connect(uri);
  console.log("[DB] Connected to MongoDB");
}

module.exports = {
  connectDatabase,
};
