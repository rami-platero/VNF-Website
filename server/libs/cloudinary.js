import { v2 as cloudinary } from "cloudinary";
import fs from "fs-extra";
import Background from "../models/Background.js";

cloudinary.config({
  cloud_name: "dikp1fayh",
  api_key: "247391362145662",
  api_secret: "fKpcGY35SL3KJ0bLT0crxvwPC7M",
});

export const uploadImage = async (filePath) => {
  return await cloudinary.uploader.upload(filePath, {
    folder: "artworks",
  });
};

export const getPreviewImage = async (publicID) => {
  return await cloudinary.url(publicID, {
    transformation: [
      { width: 533, height: 300, crop: "fill" },
      { quality: "auto:low" },
    ],
  });
};

export const deleteArtwork = async (id) => {
  return await cloudinary.uploader.destroy(id);
};

export const uploadArtwork = async (req) => {
  const art_result = await uploadImage(req.files.artwork.tempFilePath);
  await fs.remove(req.files.artwork.tempFilePath);
  return {
    url: art_result.secure_url,
    public_id: art_result.public_id,
  };
};
