// Connection require
const { getConnection } = require("../../connection");
// Service require
const { generateError } = require("../../../services/generateError");

const requestRoomQuery = async (id, roomID, friendID) => {
  let connection;
  try {
    connection = await getConnection();

    if (friendID) {
      const [isJoinedYet] = await connection.query(
        `
          SELECT user_id
          FROM room_users
          WHERE user_id = ? AND room_id = ?
        `,
        [friendID, roomID]
      );

      // Check if friend has already joined
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
        const room_title = room[0].title;

        // Write notification message
        const message = `${host_username} te ha enviado una invitación para unirte a la sala ${room_title}.`;

        // Create notification
        await connection.query(
          `INSERT INTO notifications (host_id, guest_id, message) VALUES(?, ?, ?)`,
          [id, friendID, message]
        );
      }
    } else {
      const [isJoinedYet] = await connection.query(
        `
          SELECT user_id
          FROM room_users
          WHERE user_id = ? AND room_id = ?
        `,
        [id, roomID]
      );

      // Check if user has already joined
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
            SELECT created_by, title
            FROM rooms
            WHERE id = ?
            `,
          [roomID]
        );

        // Save guest_id
        const guest_id = room[0].created_by;

        // Save title of room
        const room_title = room[0].title;

        // Write notification message
        const message = `${host_username} ha solicitado unirse a la sala ${room_title}.`;

        // Create notification
        await connection.query(
          `INSERT INTO notifications (host_id, guest_id, message) VALUES(?, ?, ?)`,
          [id, guest_id, message]
        );
      }
    }
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { requestRoomQuery };
