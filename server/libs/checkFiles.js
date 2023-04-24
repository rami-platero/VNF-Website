import Background from "../models/Background.js";
import Song from "../models/Song.js";

export const checkFiles = async (name) => {
  const fromBackground = await Background.findOne({ "file.name": name });
  console.log(fromBackground);
  if (fromBackground) {
    return fromBackground.file;
  }
  const fromSong = await Song.findOne({ "background.name": name });
  if (fromSong) {
    return fromSong.background;
  }
  return false;
};
