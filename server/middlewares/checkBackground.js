export const checkBG = (req, res, next) => {
  try {
    if (req.files.file) {
      if (!req.files.file.mimetype.startsWith("image/")) {
        throw Error(
          JSON.stringify({ message: "Only image files are allowed." })
        );
      }
    } else {
      throw Error(
        JSON.stringify({
          message: "An image is required to post a new background.",
        })
      );
    }
    next();
  } catch (error) {
    return res.status(500).json(JSON.parse(error.message));
  }
};
