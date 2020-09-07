const mongoose = require("mongoose");
const shortId = require("shortid");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minLength: 3,
    },
    _id: {
      type: String,
      default: shortId.generate,
    },
    exercises: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Exercise"
      }
    ]
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);