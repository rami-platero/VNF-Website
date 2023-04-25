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

export const getSongs = async (req, res) => {
  try {
    const songs = await Song.find();
    return res.send(songs);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const newSong = async (req, res) => {
  try {
    let artwork;
    /*CREATE CUSTOM ID*/
    const customID = await createID();
    //BACKGROUND & ARTWORK
    if (req.files?.background && req.files?.artwork) {
      //BACKGROUND
      const bgID = await Song.handleBG(req.files.background, req.body);
      console.log("bgID is", bgID);
      //ARTWORK
      const art_result = await uploadImage(req.files.artwork.tempFilePath);
      artwork = {
        url: art_result.secure_url,
        public_id: art_result.public_id,
      };
      await fs.remove(req.files.artwork.tempFilePath);
      //
      const newSong = new Song({
        ...req.body,
        customID,
        background: bgID,
        artwork,
        artists: JSON.parse(req.body.artists),
      });
      await newSong.save();
      return res.send(newSong);
    }
    //ONLY ARTWORK
    if (req.files?.artwork && !req.files?.background) {
      const result = await uploadImage(req.files.artwork.tempFilePath);
      artwork = {
        url: result.secure_url,
        public_id: result.public_id,
      };
      await fs.remove(req.files.artwork.tempFilePath);
      const { background, ...rest } = req.body;
      const newSong = new Song({
        rest,
        artwork,
        customID,
        artists: JSON.parse(req.body.artists),
      });
      await newSong.save();
      return res.send(newSong);
    }
    // ONLY BACKGROUND
    if (req.files?.background) {
      const bgID = await Song.handleBG(req.files.background, req.body);
      const newSong = new Song({
        ...req.body,
        customID,
        background: bgID,
        artists: JSON.parse(req.body.artists),
      });
      await newSong.save();
      return res.send(newSong);
    }
    //NO ARTWORK AND BACKGROUND
    if (!req.files?.artwork && !req.files?.background) {
      const { background, ...rest } = req.body;
      const newSong = new Song({
        ...rest,
        artists: JSON.parse(req.body.artists),
        customID,
      });
      await newSong.save();
      return res.send(newSong);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getSong = async (req, res) => {
  try {
    const song = await Song.findOne({ customID: req.params.id }).populate(
      "background"
    );
    return res.send(song);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateSong = async (req, res) => {
  try {
    const updatedSong = await Song.findByIdAndUpdate(
      req.params.id,
      { ...req.body, artists: JSON.parse(req.body.artists) },
      {
        new: true,
      }
    );
    const updatedSongs = await Song.find();
    return res.send(updatedSongs);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteSong = async (req, res) => {
  try {
    const deletedSong = await Song.findByIdAndDelete(req.params.id);
    if (!deletedSong) return res.sendStatus(404);
    if (deletedSong.artwork.public_id) {
      await deleteArtwork(deletedSong.artwork.public_id);
    }

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
