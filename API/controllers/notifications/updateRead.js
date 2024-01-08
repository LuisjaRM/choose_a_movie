// Querie require
const {
  updateReadQuery,
} = require("../../database/queries/notifications/-export");

const updateRead = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Query
    await updateReadQuery(id);

    res.status(201).send({
      status: "ok",
      message: `Notification marked as read`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { updateRead };
