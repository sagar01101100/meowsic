// import mongoose, { Schema, model, models } from "mongoose";

// const SongSchema = new Schema({
//   name: { type: String, required: true },
//   ytURL: { type: String, required: true },
//   user: { type: Schema.Types.ObjectId, ref: "User", required: true },
// }, { timestamps: true });

// const Song = models.Song || model("Song", SongSchema);
// export default Song;




import mongoose from "mongoose";

const SongSchema = new mongoose.Schema({
  title: String,
  videoId: String,
  duration: Number, // in seconds
  url: String,
  addedBy: String, // username
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Song || mongoose.model("Song", SongSchema);
