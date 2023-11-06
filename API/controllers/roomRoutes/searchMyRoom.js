// Querie require
const {
  searchMyRoomQuery,
} = require("../../database/queries/roomRoutes/-exportQueries");

const searchMyRoom = async (req, res, next) => {
  try {
    const { id } = req.userInfo;
    const { search } = req.body;

    // Get rooms of the user
    const rooms = await searchMyRoomQuery(id, search);

    res.status(201).send({
      status: "ok",
      data: rooms,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { searchMyRoom };
