// Querie require
const {
  acceptFriendQuery,
} = require("../../database/queries/userRoutes/-exportQueries");

const acceptFriend = async (req, res, next) => {
  try {
    const { id } = req.userInfo;
    const { username } = req.params;

    await acceptFriendQuery(id, username);

    res.status(201).send({
      status: "ok",
      message: `Successfully updated friends state`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { acceptFriend };
