// Querie require
const {
  sendFriendRequestQuery,
} = require("../../database/queries/friends/-export");

const sendFriendRequest = async (req, res, next) => {
  try {
    const id = req.userInfo.id;
    const { username, email } = req.body;

    // Query
    await sendFriendRequestQuery(id, username, email);

    res.status(200).send({
      status: "ok",
      message: "Friend added succefully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { sendFriendRequest };
