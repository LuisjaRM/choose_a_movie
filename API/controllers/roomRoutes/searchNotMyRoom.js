// Querie require
const {
  searchNotMyRoomQuery,
} = require("../../database/queries/roomRoutes/-exportQueries");

const searchNotMyRoom = async (req, res, next) => {
  try {
    const { id } = req.userInfo;
    const { search } = req.body;

    // Get rooms
    const allrooms = await searchNotMyRoomQuery(id, search);

    res.status(201).send({
      status: "ok",
      data: allrooms,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { searchNotMyRoom };
