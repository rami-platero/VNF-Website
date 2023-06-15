import { Schema, model } from "mongoose";

const backgroundSchema = new Schema({
  file: {
    download_link: String,
    name: String,
    url: String,
    public_id: String,
    preview: String
  },
  tracks: [
    {
      name: String,
      youtube_link: String,
      artists: [{ name: String }],
    },
  ],
  customID: {
    type: String,
    unique: true,
  },
});

export default model("Background", backgroundSchema);
