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
  .connect(process.env.MONGODB_URI,{ maxIdleTimeMS: 60000 })
  .then(() => console.log("db connected"));
app.use("/user", userRouter);

app.listen(process.env.PORT, () => {
  console.log("listening on port " + process.env.PORT);
});

const getMessagesReady = async (messages, cb) => {
  //this piece of code adds the sentAt property and formats the date object to properly display the sent hour and minutes
  //this function gets the profile picture and username values from the db and formats the date
  const list = messages.map(async (item) => {
    const newList = item.seenBy.map(async (object) => {
      const { profilePicture, username } = await UserModel.findOne({
        _id: object.userId,
      });
      return { userId: object.userId, username, profilePicture };
    });
    item.newSeenBy = await Promise.all(newList);
    const { profilePicture } = await UserModel.findOne({
      _id: item.sender.userId,
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
      seenBy: item.newSeenBy,
    };
  });
  if (messages) {
    Promise.all(list).then(
      (
        values //this slows down the loading a bit
      ) => {
        cb(values);
      }
    );
  }
};

io.on("connection", (socket) => {
  console.log(socket.id + " connected");

  const cb = (value) => {
    socket.emit("update-messages", value);
  };
  //checking if either username + chattingWith (firstTry) or chattingWith + username (secondTry) exists
  //This is how private rooms are named
  socket.on("join-room", async (room) => {
    try {
      const second = room.split(" ")[1] + " " + room.split(" ")[0];

      //checking whatever comes from the front end (room), (It's either a room name or username + chattingWith)
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
  socket.on("read-msg", async (room, chattingWith, user) => {
    const { userId, username } = user;

    const date = new Date();
    const roomInDB = await findTheRoom(username, room, chattingWith);

    const newMessages = roomInDB.messages;
    const message = newMessages[roomInDB.messages.length - 1];
    newMessages[roomInDB.messages.length - 1].seenBy = message.seenBy
      ? [...message.seenBy, { userId, time: date }]
      : [{ userId, time: date }];
    await RoomModel.findOneAndUpdate({ name: room }, { messages: newMessages });

  });
  socket.on(
    "send-msg",
    async (user, roomName, content, pictures, chattingWith) => {
      const room = await findTheRoom(user.username, roomName, chattingWith);
      const privateRoom = user.username + " " + chattingWith;
      //creating a new date to save it in the DB as the sent property
      const date = new Date();

      const { profilePicture } = await UserModel.findOne({ _id: user.userId });

      if (!room && chattingWith) {
        io.to(privateRoom).emit(
          "receive-msg",
          user,
          content,
          pictures,
          date.getHours().toString() + ":" + date.getMinutes().toString(),
          profilePicture
        );
        await RoomModel.create({
          name: privateRoom,
          privateRoom: true,
          messages: [{ sender: user, content, pictures, sent: date }],
        });
      } else if (!room) {
        io.to(roomName).emit(
          "receive-msg",
          user,
          content,
          pictures,
          date.getHours().toString() + ":" + date.getMinutes().toString(),
          profilePicture
        );
        await RoomModel.create({
          name: roomName,
          privateRoom: false,
          messages: [{ sender: user, content, pictures, sent: date }],
        });
      } else if (room) {
        io.to(room.name).emit(
          "receive-msg",
          user,
          content,
          pictures,
          date.getHours().toString() + ":" + date.getMinutes().toString(),
          profilePicture
        );
        const newMessages = [
          ...room.messages,
          { sender: user, content, pictures, sent: date },
        ];
        await RoomModel.findOneAndUpdate(
          { name: room.name },
          { messages: newMessages }
        );
      }
    }
  );
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
const findTheRoom = async (username, room, chattingWith) => {
  const privateRoom = username + " " + chattingWith;
  const secondPrivateRoom = chattingWith + " " + username;
  //checking both scenearios to find the privateRoom
  const firstTry = await RoomModel.findOne({ name: privateRoom });
  const secondTry = await RoomModel.findOne({ name: secondPrivateRoom });

  //searching every one of them to find the one
  const roomInDB = await RoomModel.findOne({
    name: firstTry ? privateRoom : secondTry ? secondPrivateRoom : room,
  });
  return roomInDB;
};
app.post("/loadRoom", async (req, res) => {
  try {
    const date = new Date();
    const { room, chattingWith, userId, page } = req.body;
    const roomInDB = await findTheRoom(req.username, room, chattingWith);

    const { messages } = roomInDB;
    const newMessages = messages.map((item) => {
      const doWeAlreadyHave = item.seenBy.filter(
        (item) => item.userId == userId
      );
      if (doWeAlreadyHave.length == 0) {
        item.seenBy = [...item.seenBy, { userId, time: date }];
      }

      return {
        sent: item.sent,
        sender: item.sender,
        content: item.content,
        pictures: item.pictures,
        profilePicture: item.profilePicture,
        seenBy: item.seenBy,
      };
    });
    await RoomModel.findOneAndUpdate(
      { name: roomInDB.name },
      { messages: newMessages }
    );

    const cb = (value) => {
      res.status(200).json({ messages: value });
    };
    const amount = 20;
    const limit = messages.slice((page - 1) * amount, page * amount);
    await getMessagesReady(limit, cb);
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ error: err.message });
  }
});
app.post("/loadRooms", async (req, res) => {
  try {
    const { page, amount } = req.body;
    if (!page || !amount) {
      throw new Error("You need to specify the page and the amount.");
    }
    const rooms = await RoomModel.find({ privateRoom: false })
      .limit(amount)
      .skip((page - 1) * amount)
      .select("name");
    res.status(200).json({ rooms });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.post("/findRoom", async (req, res) => {
  try {
    const { room } = req.body;
    const Rooms = await RoomModel.find().limit(20).select("name");
    const filter = Rooms.filter(
      (item) => item.name.includes(room) && !item.privateRoom
    );
    res.status(200).json({ rooms: filter });
  } catch (err) {
    console.log(err.message);

    res.status(401).json({ error: err.message });
  }
});
