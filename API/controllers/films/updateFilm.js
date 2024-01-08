// Joi require
const { updateFilmJoi } = require("../../jois/schemas");
// Services require
const { generateError } = require("../../services/generateError");
// Querie require
const { updateFilmQuery } = require("../../database/queries/films/-export");

const updateFilm = async (req, res, next) => {
  try {
    const { type, filmID } = req.params;
    const title = req.body.title === undefined ? null : req.body.title;
    const url = req.body.url === undefined ? null : req.body.url;
    const platform = req.body.platform === undefined ? null : req.body.platform;
    const checkOrDescheck =
      req.body.checkOrDescheck === undefined ? null : req.body.checkOrDescheck;
    const upOrdown = req.body.upOrdown === undefined ? null : req.body.upOrdown;

    let filesPhoto;
    try {
      filesPhoto = req.files.photo;
    } catch (error) {
      filesPhoto = null;
    }

    if (!filesPhoto) {
      // Joi validation
      const schema = updateFilmJoi;
      const validation = schema.validate(req.body);

      if (validation.error) {
        throw generateError(validation.error.message, 401);
      }
    }

    // Query
    await updateFilmQuery(
      type,
      filmID,
      filesPhoto,
      title,
      url,
      platform,
      checkOrDescheck,
      upOrdown
    );

    res.status(201).send({
      status: "ok",
      message: "Modifications have been successfully carried out",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { updateFilm };
