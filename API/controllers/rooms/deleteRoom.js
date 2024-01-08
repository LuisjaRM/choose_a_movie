// Querie require
const { deleteRoomQuery } = require("../../database/queries/rooms/-export");

const deleteRoom = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Query
    await deleteRoomQuery(id);

    res.status(200).send({
      status: "ok",
      message: `Friend successfully deleted`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { deleteRoom };
