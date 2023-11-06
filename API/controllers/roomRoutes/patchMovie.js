// Services require
const { generateError } = require("../../services/generateError");

// Joi require
const { editMovieJoi } = require("../../jois/schemas");

// Querie require
const {
  patchMovieQuery,
} = require("../../database/queries/roomRoutes/-exportQueries");

const patchMovie = async (req, res, next) => {
  try {
    const { type, movieID } = req.params;
    const { title, url, plataform } = req.body;

    // Joi validation
    const schema = editMovieJoi;
    const validation = schema.validate(req.body);

    if (validation.error) {
      throw generateError(validation.error.message, 401);
    }

    // Query:
    await patchMovieQuery({ movieID, type, title, url, plataform });

    // Res.send
    res.status(201).send({
      status: "ok",
      message: "Modifications have been successfully carried out",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { patchMovie };
