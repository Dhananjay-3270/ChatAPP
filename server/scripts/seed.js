const mongoose = require("mongoose");
const User = require("../models/user");

// Replace with your actual MongoDB URI or use environment variable
mongoose.connect(
  "mongodb+srv://shinde3270:Iekv82dFtZU91RPt@chat2cluster0.5bztdm9.mongodb.net/chatAppDB?retryWrites=true&w=majority&appName=Chat2Cluster0",
);

const users = [

  {
    fullName: "Rahul Sharma",
    userName: "rahul",
    email: "rahul@gmail.com",
    password: "rahulPass456",
    age: 28,
    role: "user",
    status: {
      state: "offline",
      description: "Away for now",
    },
  },
  {
    fullName: "Amit Verma",
    userName: "amit",
    email: "amit@gmail.com",
    password: "amitPass789",
    age: 30,
    role: "user",
    status: {
      state: "busy",
      description: "In a meeting",
    },
  },
  {
    fullName: "Sneha Kulkarni",
    userName: "sneha",
    email: "sneha@gmail.com",
    password: "snehaPass321",
    age: 27,
    role: "user",
    status: {
      state: "away",
      description: "Will reply soon",
    },
  },
];

async function seed() {
  await User.insertMany(users);
  console.log("Users inserted");
  process.exit();
}

seed();
