// Connection require
const { getConnection } = require("../../connection");

const getMyRoomsQuery = async (id) => {
  let connection;

  try {
    connection = await getConnection();

    const [rooms] = await connection.query(
      `
      SELECT r.id, r.title, r.avatar
      FROM rooms r
      INNER JOIN room_users u ON u.room_id = r.id
      WHERE u.user_id = ? AND r.deleted = 0
      ORDER BY r.title ASC
      `,
      [id]
    );

    return rooms;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { getMyRoomsQuery };
