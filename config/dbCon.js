const mongoose = require("mongoose");

const dbConn = () => {
  const dbUrl = "mongodb://127.0.0.1:27017";
  mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

  const db = mongoose.connection;

  return db.on(
    "error",
    console.error.bind(console, "MongoDb connection error:")
  );
};

module.exports = dbConn;
