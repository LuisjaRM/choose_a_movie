// Connection require
const { getConnection } = require("../../connection");

const removeRoomFriendQuery = async (friendID, roomID) => {
  let connection;
  try {
    connection = await getConnection();

    await connection.query(
      `
        DELETE
        FROM room_users
        WHERE user_id = ? AND room_id = ?
      `,
      [friendID, roomID]
    );
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { removeRoomFriendQuery };
