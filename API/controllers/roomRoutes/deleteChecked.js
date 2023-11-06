// Querie require
const {
  deleteCheckedQuery,
} = require("../../database/queries/roomRoutes/-exportQueries");

const deleteChecked = async (req, res, next) => {
  try {
    const { type } = req.params;
    const { moviesChecked } = req.body;

    await deleteCheckedQuery(type, moviesChecked);

    // Res.send
    res.status(200).send({
      status: "ok",
      message: `Friend successfully deleted`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { deleteChecked };
