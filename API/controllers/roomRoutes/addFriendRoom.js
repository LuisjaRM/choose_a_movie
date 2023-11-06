// Querie require
const {
  addFriendRoomQuery,
} = require("../../database/queries/roomRoutes/-exportQueries");

const addFriendRoom = async (req, res, next) => {
  try {
    const id = req.userInfo.id;
    const { roomID, friendID } = req.body;

    // Post Friend Query
    await addFriendRoomQuery(id, roomID, friendID);

    // Send token
    res.status(200).send({
      status: "ok",
      message: "Notification sent",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { addFriendRoom };
