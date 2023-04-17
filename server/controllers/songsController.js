import Song from "../models/Song.js";
import { deleteArtwork, uploadImage } from "../libs/cloudinary.js";
import fs from "fs-extra";

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
    let background;
    //BACKGROUND & ARTWORK
    if (req.files?.background && req.files?.artwork) {
      //BACKGROUND
      console.log("both images")
      const bg_result = await uploadImage(req.files.background.tempFilePath);
      background = {
        name: req.files.background.tempFilePath,
        url: bg_result.secure_url,
        public_id: bg_result.public_id,
      };
      await fs.remove(req.files.background.tempFilePath);
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
        background,
        artwork,
        artists: JSON.parse(req.body.artists),
      });
      await newSong.save();
      return res.send(newSong);
    }
    //ONLY ARTWORK
    if (req.files?.artwork && req.files?.background==null) {
      const result = await uploadImage(req.files.artwork.tempFilePath);
      artwork = {
        url: result.secure_url,
        public_id: result.public_id,
      };
      await fs.remove(req.files.artwork.tempFilePath);
      const newSong = new Song({
        ...req.body,
        artwork,
        artists: JSON.parse(req.body.artists),
      });
      await newSong.save();
      return res.send(newSong);
    }
    // ONLY BACKGROUND
    if (req.files?.background) {
      console.log("background")
      const result = await uploadImage(req.files.background.tempFilePath);
      background = {
        name: req.files.background.tempFilePath,
        url: result.secure_url,
        public_id: result.public_id,
      };
      await fs.remove(req.files.background.tempFilePath);
      const newSong = new Song({
        ...req.body,
        background,
        artists: JSON.parse(req.body.artists),
      });
      await newSong.save();
      return res.send(newSong);
    }
    //NO ARTWORK AND BACKGROUND
    if (req.files?.artwork==null && req.files?.background==null) {
      console.log("no images")
      const newSong = new Song({
        ...req.body,
        artists: JSON.parse(req.body.artists),
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
    const song = await Song.findOne({"customID": req.params.id});
    return res.send(song);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateSong = async (req, res) => {
  try {
    const updatedSong = await Song.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
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
