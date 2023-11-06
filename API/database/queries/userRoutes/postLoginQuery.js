// Connection require
const { getConnection } = require("../../connection");

// Service require
const { generateError } = require("../../../services/generateError");

// Npm require
const bcrypt = require("bcrypt");

const postLoginQuery = async (username, password) => {
  let connection;
  try {
    connection = await getConnection();

    const [user] = await connection.query(
      `
          SELECT id, username, email, password, deleted, active
          FROM users
          WHERE username = ?
          `,
      [username]
    );

    let validPassword = false;
    // Check if the email is correct
    if (user.length === 0 || user[0].deleted === 1) {
      throw generateError(
        "There is no user registered with this username",
        409
      );
    } else {
      // If the email is correct, check password
      validPassword = await bcrypt.compare(password, user[0].password);
    }

    // If the password is correct, create object
    let info;
    if (validPassword) {
      // Check if the user is activated
      if (user[0].active === 0) {
        throw generateError("User not verified", 401);
      } else {
        info = {
          id: user[0].id,
          username: user[0].username,
        };
      }
    } else {
      throw generateError("Incorrect password", 401);
    }

    // Return info
    return info;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { postLoginQuery };
