// Querie require
const {
  searchUserRoomsQuery,
} = require("../../database/queries/rooms/-export");

const searchUserRooms = async (req, res, next) => {
  try {
    const { id } = req.userInfo;
    const { search } = req.body;

    // Query
    const rooms = await searchUserRoomsQuery(id, search);

    res.status(201).send({
      status: "ok",
      data: rooms,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { searchUserRooms };
