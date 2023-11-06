// Querie require
const {
  getMoviesQuery,
} = require("../../database/queries/roomRoutes/-exportQueries");

const getMovies = async (req, res, next) => {
  try {
    const { roomID } = req.params;

    // Get room movies
    const data = await getMoviesQuery(roomID);

    res.status(201).send({
      status: "ok",
      data: data,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getMovies };
