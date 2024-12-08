import mongoose from "mongoose";

const LevelSchema = new mongoose.Schema({
  levelNumber: { type: Number, required: true, unique: true },
  question: { type: String, required: true },
  answer: { type: String, required: true },
  points: { type: Number, default: 1000 }
});

mongoose.models = {};
export default mongoose.models.Level || mongoose.model("Level", LevelSchema);