// Joi require
const { signupJoi } = require("../../jois/schemas");
// Services require
const { generateError } = require("../../services/generateError");
// Query require
const { signupQuery } = require("../../database/queries/auth/-export");

const signup = async (req, res, next) => {
  try {
    const { email, password, repeatPassword, username } = req.body;

    if (password !== repeatPassword) {
      throw generateError("Passwords do not match", 401);
    }

    if (password === username) {
      throw generateError("Password cannot match username", 401);
    }

    // Joi validation
    const schema = signupJoi;
    const validation = schema.validate(req.body);

    if (validation.error) {
      throw generateError(validation.error.message, 401);
    }

    // Query
    const info = await signupQuery(email, password, username);

    res.status(201).send({
      status: "ok",
      message: `User with id (${info.id}) successfully registered`,
      data: info,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { signup };
