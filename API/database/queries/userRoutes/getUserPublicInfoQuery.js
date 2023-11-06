// Connection require
const { getConnection } = require("../../connection");

// Services require
const { generateError } = require("../../../services/generateError");

const getUserPublicInfoQuery = async (username) => {
  let connection;

  try {
    connection = await getConnection();

    const [userData] = await connection.query(
      `
        SELECT id, username, avatar, created_at
        FROM users
        WHERE username = ? AND deleted = 0
      `,
      [username]
    );

    if (userData.length === 0) {
      throw generateError("There is no user with this username", 404);
    }

    return userData[0];
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { getUserPublicInfoQuery };
