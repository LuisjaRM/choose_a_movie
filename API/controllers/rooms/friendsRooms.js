// Querie require
const { friendsRoomsQuery } = require("../../database/queries/rooms/-export");

const friendsRooms = async (req, res, next) => {
  try {
    const { id } = req.userInfo;

    // Query
    const friendsRooms = await friendsRoomsQuery(id);

    res.status(201).send({
      status: "ok",
      data: friendsRooms,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { friendsRooms };
