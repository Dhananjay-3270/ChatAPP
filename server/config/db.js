// db.js
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb://shinde3270:Iekv82dFtZU91RPt@ac-qyuuwec-shard-00-00.5bztdm9.mongodb.net:27017,ac-qyuuwec-shard-00-01.5bztdm9.mongodb.net:27017,ac-qyuuwec-shard-00-02.5bztdm9.mongodb.net:27017/?ssl=true&replicaSet=atlas-37bt31-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Chat2Cluster0"
    );
    console.log(`MongoDB Connected`);
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
