// Querie require
const {
  getNotMyRoomsQuery,
} = require("../../database/queries/roomRoutes/-exportQueries");

const getNotMyRooms = async (req, res, next) => {
  try {
    // Get rooms
    const { id } = req.userInfo;
    const allRooms = await getNotMyRoomsQuery(id);

    res.status(201).send({
      status: "ok",
      data: allRooms,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getNotMyRooms };
