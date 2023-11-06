// Npm require
const jwt = require("jsonwebtoken");

// Querie require
const {
  postLoginQuery,
} = require("../../database/queries/userRoutes/-exportQueries");

const postLogin = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // Post Login
    const info = await postLoginQuery(username, password);

    // Generate a token
    const token = jwt.sign(info, process.env.SECRET_TOKEN, {
      expiresIn: "30d",
    });

    // Send token
    res.status(200).send({
      status: "ok",
      message: "Successful login",
      data: {
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { postLogin };
