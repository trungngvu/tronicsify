import mongoose from "mongoose";
const connection = {};

async function connectDb() {
  if (connection.isConnected) {
    console.log("ready database");
    return;
  }

  if (mongoose.connection.length > 0) {
    connection.isConnected = mongoose.connections[0].readyState;
    if (connection.isConnected === 1) {
      console.log("use previous connection to the database");
      return;
    }
    await mongoose.disconnect();
  }

  const db = await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "tronicsify",
  });

  console.log("new connection to the database");
  connection.isConnected = db.connections[0].readyState;
}

async function disconnectDb() {
  if (connection.isConnected) {
    if (process.env.NODE_END === "production") {
      await mongoose.disconnect();
      connection.isConnected = false;
    } else {
      console.log("not disconnected from the database");
    }
  }
}

const db = { connectDb, disconnectDb };
export default db;
