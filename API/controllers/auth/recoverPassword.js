// Querie require
const { recoverPasswordQuery } = require("../../database/queries/auth/-export");

const recoverPassword = async (req, res, next) => {
  try {
    const { username, email } = req.body;

    // Query
    await recoverPasswordQuery(username, email);

    res.status(200).send({
      status: "ok",
      message: "Password change requested",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { recoverPassword };
