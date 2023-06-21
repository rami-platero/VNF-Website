import Song from "../models/Song.js";
import { uploadArtwork } from "../libs/cloudinary.js";

const createID = async () => {
  let customID = Math.floor(Math.random() * (999999 - 100000 + 1) + 10000);
  let exists = await Song.findOne({ customID });
  while (exists) {
    customID = Math.floor(Math.random() * (999999 - 100000 + 1) + 10000);
    exists = await Song.findOne({ customID });
  }
  return customID;
};

export const checkExistingBG = async (req, res, next) => {
  try {
    const body = req.body;
    if (req.files?.background) {
      return next();
    }
    const customID = await createID();
    // CREATE ARTWORK
    if (req.files?.artwork ) {
      const artwork = await uploadArtwork(req);
      //EXISTING BACKGROUND
      if (body?.background!=="null") {
        const bgID = await Song.handleExistingBG(body, body.background);
        const newSong = new Song({
          ...body,
          customID,
          background: bgID,
          artwork,
          artists: JSON.parse(body.artists),
        });
        await newSong.save();
        return res.send(newSong);
      }
      //NO EXISTING BACKGROUND
      if (body?.background==="null") {
        const { background, ...rest } = body;
        const newSong = new Song({
          ...rest,
          artwork,
          customID,
          artists: JSON.parse(body.artists),
        });
        await newSong.save();
        return res.send(newSong);
      }
    } else {
      // NO ARTWORK
      // NO EXISTING BACKGROUND
      if(body?.background==="null") {
        const { background, ...rest } = body;
        const newSong = new Song({
          ...rest,
          artists: JSON.parse(body.artists),
          customID,
        });
        await newSong.save();
        return res.send(newSong);
      }
      // NO ARTWORK + EXISTING BACKGROUND
      if (body?.background!=="null") {
        const bgID = await Song.handleExistingBG(body, body.background);
        const newSong = new Song({
          ...body,
          customID,
          background: bgID,
          artists: JSON.parse(body.artists),
        });
        await newSong.save();
        return res.send(newSong);
      }
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: error.message });
  }
};
