// Querie require
const {
  acceptFriendRoomQuery,
} = require("../../database/queries/rooms/-export");

const acceptFriendRoom = async (req, res, next) => {
  try {
    const { id } = req.userInfo;
    const { title } = req.params;
    const { username, hostOrGuest } = req.body;

    // Query
    await acceptFriendRoomQuery(id, title, username, hostOrGuest);

    res.status(201).send({
      status: "ok",
      message: `Successfully updated room state`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { acceptFriendRoom };
