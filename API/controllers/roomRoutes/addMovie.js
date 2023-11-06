// Services require
const { generateError } = require("../../services/generateError");

// Joi require
const { addMovieJoi } = require("../../jois/schemas");

// Query require
const {
  addMovieQuery,
} = require("../../database/queries/roomRoutes/-exportQueries");

const addMovie = async (req, res, next) => {
  try {
    const { id } = req.userInfo;
    const { roomID } = req.params;
    const { url, title, plataform, type } = req.body;

    // Joi validation
    const schema = addMovieJoi;
    const validation = schema.validate(req.body);

    if (validation.error) {
      throw generateError(validation.error.message, 401);
    }

    // Query: Create new post
    const data = await addMovieQuery(id, roomID, url, title, plataform, type);

    // Res.send
    res.status(201).send({
      status: "ok",
      message: `Room with id (${data.id}) successfully registered`,
      data: data,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { addMovie };
