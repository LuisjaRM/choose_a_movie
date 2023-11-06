// Querie require
const {
  deleteFriendToRoomQuery,
} = require("../../database/queries/roomRoutes/-exportQueries");

const deleteFriendToRoom = async (req, res, next) => {
  try {
    const { user, room } = req.params;

    await deleteFriendToRoomQuery(user, room);

    // Res.send
    res.status(200).send({
      status: "ok",
      message: `Friend successfully deleted`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { deleteFriendToRoom };
