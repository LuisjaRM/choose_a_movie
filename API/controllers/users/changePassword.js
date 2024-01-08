// Joi Require
const { changePasswordJoi } = require("../../jois/schemas");
// Services require
const { generateError } = require("../../services/generateError");
// Querie require
const { changePasswordQuery } = require("../../database/queries/users/-export");

const changePassword = async (req, res, next) => {
  try {
    const id = req.userInfo.id;
    const { oldPassword, newPassword } = req.body;

    // Joi validation
    const schema = changePasswordJoi;
    const validation = schema.validate(req.body);

    if (validation.error) {
      throw generateError(validation.error.message, 401);
    }

    // Query
    await changePasswordQuery(oldPassword, newPassword, id);

    res.status(201).send({
      status: "ok",
      message: `Password successfully changed`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { changePassword };
