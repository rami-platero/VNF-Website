export const validateSong = (req, res, next) => {
  try {
    if (
      (req?.files?.background &&
        !req?.files?.background?.mimetype?.startsWith("image/")) ||
      (req?.files?.artwork &&
        !req?.files?.artwork?.mimetype?.startsWith("image/"))
    ) {
      throw Error(JSON.stringify({ message: "Only image files are allowed" }));
    }
    next();
  } catch (error) {
    return res.status(500).json(JSON.parse(error.message));
  }
};
