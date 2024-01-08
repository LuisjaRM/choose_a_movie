// Querie require
const { requestRoomQuery } = require("../../database/queries/friends/-export");

const requestRoom = async (req, res, next) => {
  try {
    const id = req.userInfo.id;
    const { roomID } = req.body;
    const friendID = req.body.friendID === undefined ? null : req.body.friendID;

    // Query
    await requestRoomQuery(id, roomID, friendID);

    res.status(200).send({
      status: "ok",
      message: "Notification sent",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { requestRoom };
