// Connection require
const { getConnection } = require("../../connection");
// Npm require
const bcrypt = require("bcrypt");
// Services require
const { generateError } = require("../../../services/generateError");

const resetPasswordQuery = async (recoverCode, newPassword) => {
  let connection;
  try {
    connection = await getConnection();

    // Check if recoverCode is correct
    const [user] = await connection.query(
      `
          SELECT username
          FROM users
          WHERE recoverCode = ? AND deleted = 0
        `,
      [recoverCode]
    );

    const username = user[0].username;

    if (user.length === 0) {
      throw generateError("Incorrect recovery code", 401);
    }

    // Check that password don't match with the username
    if (username === newPassword) {
      throw generateError("Password cannot match username", 401);
    }

    // Crypt newPassword
    const newPasswordHash = await bcrypt.hash(newPassword, 8);

    // Update password
    await connection.query(
      `
          UPDATE users
          SET password = ?, lastAuthUpdate = ?, recoverCode = NULL
          WHERE username = ?
        `,
      [newPasswordHash, new Date(), username]
    );
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { resetPasswordQuery };
