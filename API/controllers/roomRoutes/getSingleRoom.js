// Querie require
const {
  getSingleRoomQuery,
} = require("../../database/queries/roomRoutes/-exportQueries");

const getSingleRoom = async (req, res, next) => {
  try {
    const { title } = req.params;

    // Get user rooms
    const room = await getSingleRoomQuery(title);

    res.status(201).send({
      status: "ok",
      data: room,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getSingleRoom };
