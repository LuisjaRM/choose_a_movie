// Querie require
const {
  getSingleMovieQuery,
} = require("../../database/queries/roomRoutes/-exportQueries");

const getSingleMovie = async (req, res, next) => {
  try {
    const { type, movieID } = req.params;

    // Get room movies
    const data = await getSingleMovieQuery(type, movieID);

    res.status(201).send({
      status: "ok",
      data: data,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getSingleMovie };
