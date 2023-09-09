const express = require("express");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const userRouter = require("./routers/userRouter");
require("dotenv").config();
const RoomModel = require("./schemas/roomSchema");
const UserModel = require("./schemas/userSchema");
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
      const second = room.split(" ")[1] + " " + room.split(" ")[0];
      console.log(room + "room");
      const firstTry = await RoomModel.findOne({ name: room });
      const secondTry = await RoomModel.findOne({ name: second });
      if (!firstTry && !secondTry) {
        socket.join(room);
        console.log(socket.id + " connected to room (0.) " + room);
      } else if (firstTry) {
        socket.join(room);
        console.log(socket.id + " connected to room (1.) " + room);
      } else if (secondTry) {
        socket.join(second);
        console.log(socket.id + " connected to room (2.) " + second);
      }
    } catch (err) {
      console.log(err.message);
    }
  });
  socket.on("send-msg", async (user, room, content, pictures, chattingWith) => {

    const date = new Date();
    const { profilePicture } = await UserModel.findOne({ username: user });
    if (chattingWith) {
      room = user + " " + chattingWith;
      console.log(room);
      const second = room.split(" ")[1] + " " + room.split(" ")[0];
      const firstTry = await RoomModel.findOne({ name: room });
      const secondTry = await RoomModel.findOne({ name: second });
      console.log(room);
      if (firstTry) {
        io.to(room).emit(
          "receive-msg",
          user,
          content,
          pictures,
          date.getHours().toString() + ":" + date.getMinutes().toString(),
          profilePicture
        );
      } else if (secondTry) {
        io.to(second).emit(
          "receive-msg",
          user,
          content,
          pictures,
          date.getHours().toString() + ":" + date.getMinutes().toString(),
          profilePicture
        );
      }
      const inDB = await RoomModel.findOne({ name: room });
      const secondInDB = await RoomModel.findOne({ name: second });
      if (!inDB && !secondInDB) {
        await RoomModel.create({
          name: room,
          messages: [{ sender: user, content, pictures, sent: date }],
        });
      } else if (inDB) {
        inDB.messages = [
          ...inDB.messages,
          { sender: user, content, pictures, sent: date },
        ];
        await inDB.save();
      } else if (secondInDB) {
        secondInDB.messages = [
          ...secondInDB.messages,
          { sender: user, content, pictures, sent: date },
        ];
        await secondInDB.save();
      }
    } else if (await RoomModel.findOne({ name: room })) {
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
        date.getHours().toString() + ":" + date.getMinutes().toString(),
        profilePicture
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
        date.getHours().toString() + ":" + date.getMinutes().toString(),
        profilePicture
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
    const { room, chattingWith } = req.body;
    const privateRoom = req.username + " " + chattingWith;
    const secondPrivateRoom = chattingWith + " " + req.username;
    const firstTry = await RoomModel.findOne({ name: privateRoom });
    const secondTry = await RoomModel.findOne({ name: secondPrivateRoom });

    const { messages } = await RoomModel.findOne({
      name: firstTry ? privateRoom : secondTry ? secondPrivateRoom : room,
    });

    const list = messages.map(async (item) => {
      const { profilePicture } = await UserModel.findOne({
        username: item.sender,
      });
      const sentAt =
        (item.sent.getHours().toString().length == 1
          ? "0".concat(item.sent.getHours().toString())
          : item.sent.getHours().toString()) +
        ":" +
        (item.sent.getMinutes().toString().length == 1
          ? "0".concat(item.sent.getMinutes().toString())
          : item.sent.getMinutes().toString());
      return {
        sent: sentAt,
        sender: item.sender,
        content: item.content,
        pictures: item.pictures,
        profilePicture,
      };
    });
    if (messages) {
      Promise.all(list).then(
        (
          values //this slows down the loading a bit
        ) => res.status(200).json({ messages: values })
      );
    } else {
      res.status(404).json({ msg: "room not found / not created" });
    }
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ error: err.message });
  }
});
