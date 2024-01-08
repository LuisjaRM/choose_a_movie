// Connection require
const { getConnection } = require("../../connection");
// Services require
const { generateError } = require("../../../services/generateError");

const friendProfileQuery = async (username) => {
  let connection;

  try {
    connection = await getConnection();

    const [user_info] = await connection.query(
      `
        SELECT id, username, avatar, created_at
        FROM users
        WHERE username = ? AND deleted = 0
      `,
      [username]
    );

    if (user_info.length === 0) {
      throw generateError("There is no user with this username", 404);
    }

    return user_info[0];
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { friendProfileQuery };
