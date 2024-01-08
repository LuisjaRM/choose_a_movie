// Connection require
const { getConnection } = require("../../connection");
// Service require
const { generateError } = require("../../../services/generateError");

const validationQuery = async (regCode) => {
  let connection;
  try {
    connection = await getConnection();

    // Check if user was deleted
    const [user] = await connection.query(
      `
        SELECT deleted
        FROM users
        WHERE regCode = ?
      `,
      [regCode]
    );

    if (user[0].deleted === 1) {
      throw generateError("Incorrect validation. User deleted", 409);
    } else {
      // Active user
      await connection.query(
        `
          UPDATE users
          SET active = true, regCode = null
          WHERE regCode = ?
        `,
        [regCode]
      );
    }
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { validationQuery };
