// Joi require
const { addFilmJoi } = require("../../jois/schemas");
// Services require
const { generateError } = require("../../services/generateError");
// Query require
const { addFilmQuery } = require("../../database/queries/films/-export");

const addFilm = async (req, res, next) => {
  try {
    const { id } = req.userInfo;
    const { roomID } = req.params;
    const { url, title, platform, type } = req.body;

    // Joi validation
    const schema = addFilmJoi;
    const validation = schema.validate(req.body);

    if (validation.error) {
      throw generateError(validation.error.message, 401);
    }

    // Query
    const data = await addFilmQuery(id, roomID, url, title, platform, type);

    res.status(201).send({
      status: "ok",
      message: `Room with id (${data.id}) successfully registered`,
      data: data,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { addFilm };
