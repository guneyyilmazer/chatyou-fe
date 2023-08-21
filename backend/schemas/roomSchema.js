const mongoose = require("mongoose");

const roomSchema = mongoose.Schema({
  name: { required: true, type: String },
  messages: [
    {
      sender: { required: true, type: String }, //userId (GUID)
      content: { required: true, type: String },
      pictures: [String],
    },
  ],
});

module.exports = {roomSchema}
