// Querie require
const { deleteFilmQuery } = require("../../database/queries/films/-export");

const deleteFilm = async (req, res, next) => {
  try {
    const { type, filmID } = req.params;

    // Query
    await deleteFilmQuery(type, filmID);

    res.status(200).send({
      status: "ok",
      message: `Friend successfully deleted`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { deleteFilm };
