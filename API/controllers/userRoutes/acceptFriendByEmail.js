// Querie require
const {
  acceptFriendByEmailQuery,
} = require("../../database/queries/userRoutes/-exportQueries");

const acceptFriendByEmail = async (req, res, next) => {
  try {
    const { regCode } = req.params;

    await acceptFriendByEmailQuery(regCode);

    res.status(201).send({
      status: "ok",
      message: `Successfully updated friends state`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { acceptFriendByEmail };
