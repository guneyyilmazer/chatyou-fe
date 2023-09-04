const express = require("express");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const userRouter = require("./routers/userRouter");
require("dotenv").config();
const RoomModel = require("./schemas/roomSchema");
const withAuth = require("./middleware/withAuth");
require("mongoose");
const jwt = require("jsonwebtoken");
const io = require("socket.io")(3001, {
  maxHttpBufferSize: 1e7,
  cors: {
    origin: "http://localhost:3000",
  },
});
const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200,
  })
);
app.use(express.json({ limit: "10mb" }));
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("db connected"));
app.use("/user", userRouter);

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
  socket.on("send-msg", async (user, room, content, pictures) => {
    const date = new Date();
    if (await RoomModel.findOne({ name: room })) {
      const roomInDB = await RoomModel.findOne({ name: room });
      roomInDB.messages = [
        ...roomInDB.messages,
        { sender: user, content, pictures, sent: date },
      ];
      io.to(room).emit(
        "receive-msg",
        user,
        content,
        pictures,
        date.getHours().toString() + ":" + date.getMinutes().toString()
      );
      roomInDB.save();
    } else {
      await RoomModel.create({
        name: room,
        messages: [{ sender: user, content, pictures, sent: date }],
      });
      io.to(room).emit(
        "receive-msg",
        user,
        content,
        pictures,
        date.getHours().toString() + ":" + date.getMinutes().toString()
      );
    }
  });
});
app.post("/verify", async (req, res) => {
  try {
    const { token } = req.body;
    const { userId, username } = await jwt.verify(token, process.env.SECRET);
    res.status(200).json({ valid: true, userId, username });
  } catch (err) {
    res.status(401).json({ valid: false, error: err.message });
  }
});
app.use(withAuth);
app.post("/loadRoom", async (req, res) => {
  try {
    const { room } = req.body;
    const { messages } = await RoomModel.findOne({ name: room });
    const list = messages.map((item) => {
      const sentAt =
        item.sent.getHours().toString() +
        ":" +
        item.sent.getMinutes().toString();
      return {
        sent: sentAt,
        sender: item.sender,
        content: item.content,
        pictures: item.pictures,
      };
    });
    console.log(list);
    res.status(200).json({ messages:list });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ error: err.message });
  }
});
