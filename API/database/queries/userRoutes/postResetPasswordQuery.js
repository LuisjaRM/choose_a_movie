// Connection require
const { getConnection } = require("../../connection");

// Services require
const { generateError } = require("../../../services/generateError");

// Npm require
const bcrypt = require("bcrypt");
const postResetPasswordQuery = async (recoverCode, newPassword) => {
  let connection;
  try {
    connection = await getConnection();

    // Check if recoverCode is correct
    const [user] = await connection.query(
      `
          SELECT username, deleted
          FROM users
          WHERE recoverCode = ?
        `,
      [recoverCode]
    );

    if (user.length === 0 || user[0].deleted === 1) {
      throw generateError("Incorrect recovery code", 401);
    }

    if (user.username === newPassword) {
      throw generateError("Password cannot match username", 401);
    }

    // Crypt newPassword
    const newPasswordHash = await bcrypt.hash(newPassword, 8);

    // Update password
    await connection.query(
      `
          UPDATE users
          SET password = ?, lastAuthUpdate = ?, recoverCode = NULL
          WHERE id = ? AND deleted = 0
        `,
      [newPasswordHash, new Date(), user[0].id]
    );
  } finally {
    if (connection) connection.release();
  }
};

module.exports = {
  postResetPasswordQuery,
};
