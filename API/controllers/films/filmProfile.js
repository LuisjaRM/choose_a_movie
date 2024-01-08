// Querie require
const { filmProfileQuery } = require("../../database/queries/films/-export");

const filmProfile = async (req, res, next) => {
  try {
    const { type, filmID } = req.params;

    // Query
    const film = await filmProfileQuery(type, filmID);

    res.status(201).send({
      status: "ok",
      data: film,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { filmProfile };
