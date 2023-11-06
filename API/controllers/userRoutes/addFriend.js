// Querie require
const {
  addFriendQuery,
} = require("../../database/queries/userRoutes/-exportQueries");

const addFriend = async (req, res, next) => {
  try {
    const id = req.userInfo.id;
    const { username, email } = req.body;

    // Post Friend Query
    await addFriendQuery(id, username, email);

    // Send token
    res.status(200).send({
      status: "ok",
      message: "Friend added succefully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { addFriend };
