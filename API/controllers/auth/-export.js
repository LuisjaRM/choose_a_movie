const { login } = require("./login");
const { recoverPassword } = require("./recoverPassword");
const { resetPassword } = require("./resetPassword");
const { signup } = require("./signup");
const { validation } = require("./validation");

module.exports = {
  login,
  recoverPassword,
  resetPassword,
  signup,
  validation,
};
