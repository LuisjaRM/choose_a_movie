// Querie require
const { acceptFriendQuery } = require("../../database/queries/friends/-export");

const acceptFriend = async (req, res, next) => {
  try {
    const { id } = req.userInfo;
    const { item } = req.params;

    // Query
    await acceptFriendQuery(id, item);

    res.status(201).send({
      status: "ok",
      message: `Successfully updated friends state`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { acceptFriend };
