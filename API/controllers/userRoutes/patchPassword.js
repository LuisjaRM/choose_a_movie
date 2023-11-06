// Services require
const { generateError } = require("../../services/generateError");

// Joi Require
const { patchPasswordJoi } = require("../../jois/schemas");

// Querie require
const {
  patchPasswordQuery,
} = require("../../database/queries/userRoutes/-exportQueries");

const patchPassword = async (req, res, next) => {
  try {
    const id = req.userInfo.id;
    const { oldPassword, newPassword } = req.body;

    // Joi validation
    const schema = patchPasswordJoi;
    const validation = schema.validate(req.body);

    if (validation.error) {
      throw generateError(validation.error.message, 401);
    }

    // Check the newPasswrod
    if (oldPassword === newPassword) {
      throw generateError("The new password is the same as the old one", 401);
    }

    // Change password
    await patchPasswordQuery(oldPassword, newPassword, id);

    res.status(201).send({
      status: "ok",
      message: `Password successfully changed`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { patchPassword };
