// Querie require
const {
  deleteRoomQuery,
} = require("../../database/queries/roomRoutes/-exportQueries");

const deleteRoom = async (req, res, next) => {
  try {
    const { type, roomTitle } = req.params;

    await deleteRoomQuery(type, roomTitle);

    // Res.send
    res.status(200).send({
      status: "ok",
      message: `Friend successfully deleted`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { deleteRoom };
