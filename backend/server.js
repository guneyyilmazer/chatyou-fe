const express = require("express");
const { default: mongoose } = require("mongoose");
require("dotenv").config();
require("mongoose");
const io = require("socket.io")(3001, {
  maxHttpBufferSize: 1e7,
  cors: {
    origin: "http://localhost:3000",
  },
});
const app = express();
app.use(express.json({ limit: "10mb" }));

app.listen(process.env.PORT, () => {
  console.log("listening on port " + process.env.PORT);
});

io.on("connection", (socket) => {
  console.log(socket.id + " connected");

  socket.on("join-room", async (room) => {
    try {
      socket.join(room);
      console.log(socket.id + " connected to room " + room);
    } catch (err) {}
  });
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("db connected"));
