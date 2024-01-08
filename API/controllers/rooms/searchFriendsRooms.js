// Querie require
const {
  searchFriendsRoomsQuery,
} = require("../../database/queries/rooms/-export");

const searchFriendsRooms = async (req, res, next) => {
  try {
    const { id } = req.userInfo;
    const { search } = req.body;

    // Query
    const friendsRooms = await searchFriendsRoomsQuery(id, search);

    res.status(201).send({
      status: "ok",
      data: friendsRooms,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { searchFriendsRooms };
