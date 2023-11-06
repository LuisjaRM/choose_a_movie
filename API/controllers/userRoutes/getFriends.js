// Querie require
const {
  getFriendsQuery,
} = require("../../database/queries/userRoutes/-exportQueries");

const getFriends = async (req, res, next) => {
  try {
    const { id } = req.userInfo;

    // Get user friends
    const friends = await getFriendsQuery(id);

    res.status(201).send({
      status: "ok",
      data: friends,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getFriends };
