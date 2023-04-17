import Background from "../models/Background.js";
import { deleteArtwork, uploadImage } from "../libs/cloudinary.js";
import fs from "fs-extra";

export const getBackgrounds = async (req, res) => {
  try {
    const bgs = await Background.find();
    return res.send(bgs);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const postBackground = async (req, res) => {
  try {
    let file;
    if (req.files.file) {
      //UPLOAD TO CLOUDINARY
      const result = await uploadImage(req.files.file.tempFilePath);
      const dwLink = result?.secure_url?.split("upload/");
      dwLink?.splice(
        1,
        0,
        `upload/fl_attachment:${
          req.files.file.name.replace(/[\(\)']+/g, "").split(".")[0]
        }/`
      );
      file = {
        name: req.files.file.name,
        download_link: dwLink.join(""),
        url: result.secure_url,
        public_id: result.public_id,
      };
      await fs.remove(req.files.file.tempFilePath);
      let customID = Math.floor(Math.random() * (999999 - 100000 + 1) + 10000);
      let exists = await Background.findOne({ customID });
      console.log(exists)
      while (exists) {
        customID = Math.floor(Math.random() * (999999 - 100000 + 1) + 10000);
        exists = await Background.findOne({ customID })
      }
      const bg = new Background({
        customID,
        tracks: JSON.parse(req.body.tracks),
        file,
      });
      await bg.save();
      return res.send(bg);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const getBackground = async (req, res) => {
  try {
    const background = await Background.findOne({ customID: req.params.id });
    console.log(req.params.id);
    return res.send(background);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const putBackground = async (req, res) => {
  try {
    await Background.findByIdAndUpdate(req.params.id, req.body);
    const updatedBackgrounds = Background.find();
    return res.send(updatedBackgrounds);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const delBackground = async (req, res) => {
  try {
    const deletedBackground = await Background.findByIdAndDelete(req.params.id);
    if (!deletedBackground) return res.sendStatus(404);
    if (deletedBackground?.file?.public_id) {
      await deleteArtwork(deletedBackground.file.public_id);
    }

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
