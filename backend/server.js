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



app.listen(process.env.PORT, () => {
  console.log("listening on port " + process.env.PORT);
});

io.on("connection",(socket)=>{
    console.log(socket.id+" connected")
})

mongoose.connect("mongodb://localhost:27017/chatapp").then(()=>console.log("db connected"))