const express = require("express");
const socket = require("socket.io");
const http = require("http");
const cors = require("cors");
const buildToken = require("./meetingController");
const getToken = require("./meetingController");

const app = express();

app.use(cors({ origin: "*" }));

app.use(express.json());

const server = http.createServer();

const io = new socket.Server(server, {
  cors: {
    origin: "*",
  },
});

const users = [
  {
    name: "Abbas",
    email: "abbasbhp787@gmail.com",
    messages: [
      { type: "send", msg: "Hii" },
      { type: "received", msg: "Hello" },
    ],
  },
  {
    name: "Moiz",
    email: "moizbhp787@gmail.com",
    messages: [
      { type: "received", msg: "Hii" },
      { type: "send", msg: "Hello" },
    ],
  },
];

app.post("/token", getToken);

// io.on("connection", (socket) => {
//   console.log("User connected");
//   // socket
// });

const port = 8000;
app.listen(port, () => {
  console.log(`Listening to Request on port ${port}`);
});
