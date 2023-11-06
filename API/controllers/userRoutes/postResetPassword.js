// Services require
const { generateError } = require("../../services/generateError");

// Query require
const {
  postResetPasswordQuery,
} = require("../../database/queries/userRoutes/-exportQueries");

// Joi require
const { resetPasswordJoi } = require("../../jois/schemas");

const postResetPassword = async (req, res, next) => {
  try {
    const { recoverCode, newPassword } = req.body;

    // Joi validation
    const schema = resetPasswordJoi;
    const validation = schema.validate(req.body);

    if (validation.error) {
      throw generateError(validation.error.message, 401);
    }

    // Set password
    await postResetPasswordQuery(recoverCode, newPassword);

    res.status(201).send({
      status: "ok",
      message: "Password has been successfully reset",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { postResetPassword };
