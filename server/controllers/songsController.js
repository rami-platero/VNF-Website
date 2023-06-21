import Song from "../models/Song.js";
import {
  deleteArtwork,
  uploadArtwork,
  uploadImage,
} from "../libs/cloudinary.js";
import fs from "fs-extra";
import Redis from "redis";

const redisClient = Redis.createClient();

const createID = async () => {
  let customID = Math.floor(Math.random() * (999999 - 100000 + 1) + 10000);
  let exists = await Song.findOne({ customID });
  while (exists) {
    customID = Math.floor(Math.random() * (999999 - 100000 + 1) + 10000);
    exists = await Song.findOne({ customID });
  }
  return customID;
};

export const getSongs = async (req, res) => {
  try {
    const data = await Song.find();
    return res.send(data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const newSong = async (req, res) => {
  try {
    const body = req.body
    /*CREATE CUSTOM ID*/
    const customID = await createID();
    //BACKGROUND & ARTWORK
    if (req?.files?.artwork) {
      const {background, ...rest} = body
      const bgID = await Song.handleBG(
        req.files.background,
        rest
      );
      const artwork = await uploadArtwork(req);
      const newSong = new Song({
        ...rest,
        customID,
        background: bgID,
        artwork,
        artists: JSON.parse(body.artists),
      });
      await newSong.save();
      return res.send(newSong);
    }
    //NO ARTWORK AND BACKGROUND FILE
    const { background, artwork, ...rest } = body;
    const bgID = await Song.handleBG(req.files.background, rest);
    const newSong = new Song({
      ...rest,
      background: bgID,
      artists: JSON.parse(body.artists),
      customID,
    });
    await newSong.save();
    return res.send(newSong);
  } catch (error) {
    console.log(error);
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
