// Querie require
const {
  patchOrderValueQuery,
} = require("../../database/queries/roomRoutes/-exportQueries");

const patchOrderValue = async (req, res, next) => {
  try {
    const { type, movieID } = req.params;
    const { upOrdown } = req.body;

    // Query:
    await patchOrderValueQuery({ movieID, type, upOrdown });

    // Res.send
    res.status(201).send({
      status: "ok",
      message: "Modifications have been successfully carried out",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { patchOrderValue };
