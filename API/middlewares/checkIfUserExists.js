// Connection require
const { getConnection } = require("../database/connection");

// Services require
const { generateError } = require("../services/generateError");

const checkIfUserExists = async (req, res, next) => {
  let connection;
  try {
    const { regCode } = req.params;
    const { email, username } = req.body;

    connection = await getConnection();

    if (regCode != undefined) {
      // Check that user exists
      const [userExists] = await connection.query(
        `SELECT regCode FROM users WHERE regCode = ?`,
        [regCode]
      );

      if (userExists.length === 0) {
        throw generateError("There is no user registered with this code", 409);
      }
    }

    if (email != undefined) {
      // Check that no other user exists with that mail
      const [userEmailExists] = await connection.query(
        `SELECT email FROM users WHERE email = ? AND deleted = 0`,
        [email]
      );

      if (userEmailExists.length > 0) {
        throw generateError(
          "There is already a registered user with the same email address",
          409
        );
      }
    }

    if (username != undefined) {
      // Check that no other user exists with that mail
      const [userNameExists] = await connection.query(
        `SELECT username FROM users WHERE username = ? AND deleted = 0`,
        [username]
      );

      if (userNameExists.length > 0) {
        throw generateError(
          "There is already a registered user with the same username address",
          409
        );
      }
    }

    next();
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = checkIfUserExists;
