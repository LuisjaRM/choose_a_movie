// Querie require
const {
  removeRoomFriendQuery,
} = require("../../database/queries/rooms/-export");

const removeRoomFriend = async (req, res, next) => {
  try {
    const { friendID, roomID } = req.params;

    // Query
    await removeRoomFriendQuery(friendID, roomID);

    res.status(200).send({
      status: "ok",
      message: `Friend successfully deleted`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { removeRoomFriend };
