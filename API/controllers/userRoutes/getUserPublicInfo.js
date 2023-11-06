// Querie require
const {
  getUserPublicInfoQuery,
} = require("../../database/queries/userRoutes/-exportQueries");

const getUserPublicInfo = async (req, res, next) => {
  try {
    const { username } = req.params;

    const userData = await getUserPublicInfoQuery(username);

    res.status(201).send({
      status: "ok",
      data: userData,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getUserPublicInfo };
