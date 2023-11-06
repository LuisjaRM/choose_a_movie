// Querie require
const {
  searchFriendQuery,
} = require("../../database/queries/userRoutes/-exportQueries");

const searchFriend = async (req, res, next) => {
  try {
    const { id } = req.userInfo;
    const { search } = req.body;

    // Get notifications of the user
    const friends = await searchFriendQuery(id, search);

    res.status(201).send({
      status: "ok",
      data: friends,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { searchFriend };
