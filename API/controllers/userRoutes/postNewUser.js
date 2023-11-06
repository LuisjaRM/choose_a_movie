// Services require
const { generateError } = require("../../services/generateError");

// Joi require
const { newUserJoi } = require("../../jois/schemas");

// Query require
const {
  postNewUserQuery,
} = require("../../database/queries/userRoutes/-exportQueries");

const postNewUser = async (req, res, next) => {
  try {
    const { email, password, username } = req.body;

    // Joi validation
    const schema = newUserJoi;
    const validation = schema.validate(req.body);

    if (validation.error) {
      throw generateError(validation.error.message, 401);
    }

    // Query: Create new user
    const info = await postNewUserQuery(email, password, username);

    // Res.send
    res.status(201).send({
      status: "ok",
      message: `User with id (${info.id}) successfully registered`,
      data: info,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { postNewUser };
