// Querie require
const { roomFilmsQuery } = require("../../database/queries/films/-export");

const roomFilms = async (req, res, next) => {
  try {
    const { roomID } = req.params;

    // Query
    const data = await roomFilmsQuery(roomID);

    res.status(201).send({
      status: "ok",
      data: data,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { roomFilms };
