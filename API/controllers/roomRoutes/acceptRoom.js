// Querie require
const {
  acceptRoomQuery,
} = require("../../database/queries/roomRoutes/-exportQueries");

const acceptRoom = async (req, res, next) => {
  try {
    const { id } = req.userInfo;
    const { room } = req.params;
    const { username } = req.body;
    console.log(room);

    await acceptRoomQuery(id, room, username);

    res.status(201).send({
      status: "ok",
      message: `Successfully updated room state`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { acceptRoom };
