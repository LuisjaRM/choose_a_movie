// Npm require
const jwt = require("jsonwebtoken");
// Querie require
const { loginQuery } = require("../../database/queries/auth/-export");

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // Query
    const info = await loginQuery(username, password);

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

module.exports = { login };
