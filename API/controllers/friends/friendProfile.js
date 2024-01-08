// Querie require
const {
  friendProfileQuery,
} = require("../../database/queries/friends/-export");

const friendProfile = async (req, res, next) => {
  try {
    const { username } = req.params;

    // Querie
    const user_info = await friendProfileQuery(username);

    res.status(201).send({
      status: "ok",
      data: user_info,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { friendProfile };
