// Joi require
const { resetPasswordJoi } = require("../../jois/schemas");
// Services require
const { generateError } = require("../../services/generateError");
// Query require
const { resetPasswordQuery } = require("../../database/queries/auth/-export");

const resetPassword = async (req, res, next) => {
  try {
    const { recoverCode, newPassword, repeatPassword } = req.body;

    if (newPassword !== repeatPassword) {
      throw generateError("Passwords do not match", 401);
    }

    // Joi validation
    const schema = resetPasswordJoi;
    const validation = schema.validate(req.body);

    if (validation.error) {
      throw generateError(validation.error.message, 401);
    }

    // Query
    await resetPasswordQuery(recoverCode, newPassword);

    res.status(201).send({
      status: "ok",
      message: "Password has been successfully reset",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { resetPassword };
