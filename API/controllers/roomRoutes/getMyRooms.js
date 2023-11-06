// Querie require
const {
  getMyRoomsQuery,
} = require("../../database/queries/roomRoutes/-exportQueries");

const getMyRooms = async (req, res, next) => {
  try {
    const { id } = req.userInfo;

    // Get user rooms
    const rooms = await getMyRoomsQuery(id);

    res.status(201).send({
      status: "ok",
      data: rooms,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getMyRooms };
