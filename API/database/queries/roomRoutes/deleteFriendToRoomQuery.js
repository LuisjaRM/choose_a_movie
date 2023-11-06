// Connection require
const { getConnection } = require("../../connection");

const deleteFriendToRoomQuery = async (user, room) => {
  let connection;
  try {
    connection = await getConnection();

    const [room_info] = await connection.query(
      `
        SELECT id
        FROM rooms
        WHERE title = ?
        `,
      [room]
    );

    await connection.query(
      `
        DELETE
        FROM room_users
        WHERE user_id = ? AND room_id = ?
        `,
      [user, room_info[0].id]
    );
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { deleteFriendToRoomQuery };
