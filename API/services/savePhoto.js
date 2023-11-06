// npm requires
const sharp = require("sharp");
const uuid = require("uuid");
const path = require("path");

const savePhoto = async (dataPhoto) => {
  // Create image with Sharp
  const img = sharp(dataPhoto.data);

  // Generate a name to the image
  const photoName = `${uuid.v4()}_${dataPhoto.name}`;

  // Save image
  await img.toFile(
    path.join(__dirname, process.env.UPLOADS_DIRECTORY, photoName)
  );

  return photoName;
};

module.exports = { savePhoto };
