const express = require("express");
const cors = require("cors")
const { default: mongoose } = require("mongoose");
const userRouter = require("./routers/userRouter");
require("dotenv").config();
const RoomModel = require("./schemas/roomSchema");
const withAuth = require("./middleware/withAuth");
require("mongoose");
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
    if (await RoomModel.findOne({ name: room })) {
      const roomInDB = await RoomModel.findOne({ name: room });
      roomInDB.messages = [
        ...roomInDB.messages,
        { sender: user, content, pictures },
      ];
      io.to(room).emit("receive-msg", user, content, pictures);
      roomInDB.save();
    } else {
      await RoomModel.create({
        name: room,
        messages: [{ sender: user, content, pictures }],
      });
      io.to(room).emit("receive-msg", content, pictures);
    }
  });
});
app.use(withAuth)
app.post("/loadRoom",async(req,res)=>{
    try{

        const {room} = req.body
        const {messages} = await RoomModel.findOne({name:room})
        console.log(messages)
        res.status(200).json({messages})
    }
    catch(err){
        res.status(400).json({error:err.message})
    }
    
})