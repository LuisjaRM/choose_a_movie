// Connection require
const { getConnection } = require("../../connection");

const getUserPrivateInfoQuery = async (id) => {
  let connection;

  try {
    connection = await getConnection();

    const [userData] = await connection.query(
      `
        SELECT id, email, username, avatar, phone, created_at
        FROM users WHERE id = ?
      `,
      [id]
    );

    return userData[0];
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { getUserPrivateInfoQuery };
