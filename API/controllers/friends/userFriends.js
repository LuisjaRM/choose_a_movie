// Querie require
const { userFriendsQuery } = require("../../database/queries/friends/-export");

const userFriends = async (req, res, next) => {
  try {
    const { id } = req.userInfo;

    // Query
    const friends = await userFriendsQuery(id);

    res.status(201).send({
      status: "ok",
      data: friends,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { userFriends };
