// Connection require
const { getConnection } = require("../../connection");

// Service require
const { generateError } = require("../../../services/generateError");

const addFriendRoomQuery = async (id, roomID, friendID) => {
  let connection;
  try {
    connection = await getConnection();

    const [isJoinedYet] = await connection.query(
      `
        SELECT user_id
        FROM room_users
        WHERE user_id = ? AND room_id = ?
        `,
      [friendID, roomID]
    );

    if (isJoinedYet.length > 0) {
      throw generateError("Has already joined", 401);
    } else {
      const [host_user] = await connection.query(
        `
          SELECT username
          FROM users
          WHERE id = ?
          `,
        [id]
      );

      // Save username of host_user
      const host_username = host_user[0].username;

      const [room] = await connection.query(
        `
          SELECT title
          FROM rooms
          WHERE id = ?
          `,
        [roomID]
      );

      // Save title of room
      const room_name = room[0].title;

      // Write notification message
      const message = `${host_username} te ha enviado una invitación para unirte a la sala ${room_name}.`;

      // Create notification
      await connection.query(
        `INSERT INTO notifications (host_id, guest_id, message) VALUES(?, ?, ?)`,
        [id, friendID, message]
      );
    }
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { addFriendRoomQuery };
