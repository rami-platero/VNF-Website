import { Schema, model } from "mongoose";

const songSchema = new Schema({
  name: String,
  artists: [
    {
      name: String,
    },
  ],
  customID: {
    type: String,
    unique: true,
    default: Math.floor(Math.random() * (999999 - 100000 + 1) + 10000),
  },
  upload_date: String,
  status: String,
  link: String,
  duration: String,
  genre: String,
  artwork: {
    url: String,
    public_id: String,
  },
  background: {
    name: String,
    url: String,
    public_id: String,
  },
  original_link: String,
  original_description: String,
  views: { type: String, default: 0 },
  views_date: String,
});

export default model("Song", songSchema);
