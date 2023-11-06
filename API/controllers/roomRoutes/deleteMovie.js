// Querie require
const {
  deleteMovieQuery,
} = require("../../database/queries/roomRoutes/-exportQueries");

const deleteMovie = async (req, res, next) => {
  try {
    const { type, movieID } = req.params;

    await deleteMovieQuery(type, movieID);

    // Res.send
    res.status(200).send({
      status: "ok",
      message: `Friend successfully deleted`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { deleteMovie };
