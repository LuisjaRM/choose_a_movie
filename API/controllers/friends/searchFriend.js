// Querie require
const { searchFriendQuery } = require("../../database/queries/friends/-export");

const searchFriend = async (req, res, next) => {
  try {
    const { id } = req.userInfo;
    const { search } = req.body;

    // Query
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
