// Querie require
const {
  sendRequestRoomQuery,
} = require("../../database/queries/roomRoutes/-exportQueries");

const sendRequestRoom = async (req, res, next) => {
  try {
    const id = req.userInfo.id;
    const { roomID } = req.body;

    // Post Friend Query
    await sendRequestRoomQuery(id, roomID);

    // Send token
    res.status(200).send({
      status: "ok",
      message: "Notification sent",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { sendRequestRoom };
