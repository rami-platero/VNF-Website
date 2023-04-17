import { v2 as cloudinary } from "cloudinary";

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

export const deleteArtwork = async id =>{
    return await cloudinary.uploader.destroy(id)
}
