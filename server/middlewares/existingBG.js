import Song from "../models/Song.js";
import { deleteArtwork, uploadImage } from "../libs/cloudinary.js";
import fs from "fs-extra";
import Background from "../models/Background.js";

const createID = async () => {
  let customID = Math.floor(Math.random() * (999999 - 100000 + 1) + 10000);
  let exists = await Background.findOne({ customID });
  console.log(exists);
  while (exists) {
    customID = Math.floor(Math.random() * (999999 - 100000 + 1) + 10000);
    exists = await Background.findOne({ customID });
  }
  return customID;
};

export const checkExistingBG = async (req, res, next) => {
    try {
      let artwork;
      const customID = await createID();
      const body = JSON.parse(JSON.stringify(req.body))
      //EXISTING BACKGROUNDS
      //BACKGROUND & ARTWORK
      if (body?.background && req.files?.artwork) {
        const bgID = await Song.handleExistingBG(body,body.background);
        const art_result = await uploadImage(req.files.artwork.tempFilePath);
        artwork = {
          url: art_result.secure_url,
          public_id: art_result.public_id,
        };
        await fs.remove(req.files.artwork.tempFilePath);
        //
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
      if (req.files?.artwork && !body.background && !req.files?.background) {
        const result = await uploadImage(req.files.artwork.tempFilePath);
        artwork = {
          url: result.secure_url,
          public_id: result.public_id,
        };
        await fs.remove(req.files.artwork.tempFilePath);
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
        console.log("only background with existing bg")
        const bgID = await Song.handleExistingBG(body,body.background);
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
          customID
        });
        await newSong.save();
        return res.send(newSong);
      }
      next();
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };