// Connection require
const { getConnection } = require("../../connection");

const privateInfoQuery = async (id) => {
  let connection;

  try {
    connection = await getConnection();

    const [user_info] = await connection.query(
      `
        SELECT id, email, username, avatar, phone, created_at
        FROM users
        WHERE id = ?
      `,
      [id]
    );

    return user_info[0];
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { privateInfoQuery };
