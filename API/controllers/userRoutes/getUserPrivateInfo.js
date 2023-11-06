// Querie require
const {
  getUserPrivateInfoQuery,
} = require("../../database/queries/userRoutes/-exportQueries");

const getUserPrivateInfo = async (req, res, next) => {
  try {
    const { id } = req.userInfo;

    // Get private information of user
    const userData = await getUserPrivateInfoQuery(id);

    res.status(201).send({
      status: "ok",
      data: userData,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getUserPrivateInfo };
