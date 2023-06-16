import Song from "../models/Song.js";
import { deleteArtwork, uploadArtwork, uploadImage } from "../libs/cloudinary.js";
import fs from "fs-extra";
import Background from "../models/Background.js";

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
    const customID = await createID();
    const body = req.body
    //const body = JSON.parse(JSON.stringify(req.body));
    if(req.files?.background){
      next()
    }
    //EXISTING BACKGROUNDS
    //BACKGROUND & ARTWORK
    if (JSON.parse(body?.background) && req.files?.artwork) {
      const bgID = await Song.handleExistingBG(body, body.background);
      const artwork = uploadArtwork(req)
      await fs.remove(req.files.artwork.tempFilePath);
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
    //ONLY ARTWORK
    if (req.files?.artwork && !body.background) {
      const artwork = uploadArtwork(req)
      const { background, ...rest } = body;
      const newSong = new Song({
        rest,
        artwork,
        customID,
        artists: JSON.parse(body.artists),
      });
      await newSong.save();
      return res.send(newSong);
    }
    // ONLY BACKGROUND
    if (body?.background) {
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
    //NO ARTWORK AND BACKGROUND
    if (!req.files?.artwork && !body?.background && !req.files?.background) {
      const { background, ...rest } = body;
      const newSong = new Song({
        ...rest,
        artists: JSON.parse(body.artists),
        customID,
      });
      await newSong.save();
      return res.send(newSong);
    }
    next();
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
};
