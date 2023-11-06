// Querie require
const {
  patchIsCheckQuery,
} = require("../../database/queries/roomRoutes/-exportQueries");

const patchIsCheck = async (req, res, next) => {
  try {
    const { type, movieID } = req.params;
    const { checkOrDescheck } = req.body;

    // Query:
    await patchIsCheckQuery({ movieID, type, checkOrDescheck });

    // Res.send
    res.status(201).send({
      status: "ok",
      message: "Modifications have been successfully carried out",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { patchIsCheck };
