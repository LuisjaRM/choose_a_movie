// Querie require
const { userRoomsQuery } = require("../../database/queries/rooms/-export");

const userRooms = async (req, res, next) => {
  try {
    const { id } = req.userInfo;

    // Query
    const rooms = await userRoomsQuery(id);

    res.status(201).send({
      status: "ok",
      data: rooms,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { userRooms };
