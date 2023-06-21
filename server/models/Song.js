import { Schema, model } from "mongoose";
import Background from "./Background.js";
import { newBackground } from "../controllers/bgsController.js";

const songSchema = new Schema({
  name: String,
  artists: [
    {
      name: String,
    },
  ],
  customID: {
    type: Number,
    unique: true,
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
    ref: "Background",
    required: false,
    type: Schema.Types.ObjectId,
  },
  original_link: String,
  original_description: String,
  views: { type: Number, default: 0 },
  views_date: String,
});

songSchema.statics.handleBG = async function (file, body) {
  const background = await Background.findOne({ "file.name": file.name });
  if (background!==null) {
    const exists = background?.tracks?.some((track) => {
      return track.name === body.name && track.youtube_link == body.link;
    });
    if (exists) {
      return background._id;
    } else {
      await Background.updateOne(
        { _id: background._id },
        {
          $push: {
            tracks: {
              name: body.name,
              youtube_link: body.link,
              artists: JSON.parse(body.artists),
            },
          },
        }
      );
      return background._id;
    }
  }
  const createBG = await newBackground(file, body);
  return createBG;
};

songSchema.statics.handleExistingBG = async function (body,bg) {
    const background = await Background.findOne({_id: bg})
    const exists = background.tracks.some((track) => {
      return track.name === body.name && track.youtube_link == body.link;
    });
    if (exists) {
      return bg;
    } else {
      await Background.updateOne(
        { _id: bg},
        {
          $push: {
            tracks: {
              name: body.name,
              youtube_link: body.link,
              artists: JSON.parse(body.artists),
            },
          },
        }
      );
      return bg;
    }
};

export default model("Song", songSchema);
