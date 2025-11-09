const mongoose = require("mongoose");

const learnerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["learner", "instructor", "admin"],
      default: "student",
    },
    mastery: {
      type: Map,
      of: Number, // e.g., { "algebra": 0.75, "loops": 0.6 }
      default: {},
    },
    attempts: [
      {
        itemId: mongoose.Schema.Types.ObjectId,
        correct: Number, // ✅ store numeric score
        total: Number, // ✅ store total questions
        topic: String, // ✅ store quiz topic
        timestamp: { type: Date, default: Date.now },
        timeSpent: { type: Number, default: 0 },
      },
    ],

    streaks: {
      type: Map,
      of: Number, // e.g., { "algebra": 3 }
      default: {},
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Learner", learnerSchema);
