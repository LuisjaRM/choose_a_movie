// Querie require
const {
  postRecoverPasswordQuery,
} = require("../../database/queries/userRoutes/-exportQueries");

const postRecoverPassword = async (req, res, next) => {
  try {
    const { username, email } = req.body;

    // Create recoverCode
    await postRecoverPasswordQuery(username, email);

    res.status(200).send({
      status: "ok",
      message: "Password change requested",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { postRecoverPassword };
