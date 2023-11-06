// Querie require
const {
  acceptRequestRoomQuery,
} = require("../../database/queries/roomRoutes/-exportQueries");

const acceptRequestRoom = async (req, res, next) => {
  try {
    const { id } = req.userInfo;
    const { room } = req.params;
    const { username } = req.body;
    console.log(room);

    await acceptRequestRoomQuery(id, room, username);

    res.status(201).send({
      status: "ok",
      message: `Successfully updated room state`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { acceptRequestRoom };
