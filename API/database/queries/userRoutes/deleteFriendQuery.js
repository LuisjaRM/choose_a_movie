// Connection require
const { getConnection } = require("../../connection");

const deleteFriendQuery = async (user_id, friend_id) => {
  let connection;
  try {
    connection = await getConnection();

    await connection.query(
      `
        DELETE
        FROM friends
        WHERE host_id = ? AND guest_id = ? OR host_id = ? AND guest_id = ?
        `,
      [user_id, friend_id, friend_id, user_id]
    );
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { deleteFriendQuery };
