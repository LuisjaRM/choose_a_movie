// Querie require
const {
  deleteFriendQuery,
} = require("../../database/queries/userRoutes/-exportQueries");

const deleteFriend = async (req, res, next) => {
  try {
    const user_id = req.userInfo.id;
    const friend_id = req.params.id;

    await deleteFriendQuery(user_id, friend_id);

    // Res.send
    res.status(200).send({
      status: "ok",
      message: `Friend successfully deleted`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { deleteFriend };
