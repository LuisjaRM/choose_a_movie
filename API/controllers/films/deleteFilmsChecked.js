// Querie require
const {
  deleteFilmsCheckedQuery,
} = require("../../database/queries/films/-export");

const deleteFilmsChecked = async (req, res, next) => {
  try {
    const { type } = req.params;

    // Query
    await deleteFilmsCheckedQuery(type);

    res.status(200).send({
      status: "ok",
      message: `Friend successfully deleted`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { deleteFilmsChecked };
