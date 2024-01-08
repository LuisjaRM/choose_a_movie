// Querie require
const { deleteFriendQuery } = require("../../database/queries/friends/-export");

const deleteFriend = async (req, res, next) => {
  try {
    const user_id = req.userInfo.id;
    const friend_id = req.params.id;

    // Query
    await deleteFriendQuery(user_id, friend_id);

    res.status(200).send({
      status: "ok",
      message: `Friend successfully deleted`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { deleteFriend };
