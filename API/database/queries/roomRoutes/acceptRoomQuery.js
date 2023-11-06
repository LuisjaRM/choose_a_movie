// Connection require
const { getConnection } = require("../../connection");

// Services require
const { generateError } = require("../../../services/generateError");

const acceptRoomQuery = async (id, room, username) => {
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

    // Check if room exists
    if (room_info.length < 1) {
      throw generateError("There is no room", 401);
    }

    // Save room_id
    room_id = room_info[0].id;

    const [room_users] = await connection.query(
      `
          SELECT room_id
          FROM room_users
          WHERE room_id = ? AND user_id = ?
        `,
      [room_id, id]
    );

    // Check if user already accept the invitation
    if (room_users.length > 0) {
      throw generateError(
        "The relationship between user and room already exists",
        401
      );
    } else {
      await connection.query(
        `INSERT INTO room_users (user_id, room_id) VALUES(?, ?)`,
        [id, room_id]
      );

      const [host_info] = await connection.query(
        `
              SELECT username
              FROM users
              WHERE id = ?
            `,
        [id]
      );

      // Save username of host_user
      const host_username = host_info[0].username;

      const [guest_info] = await connection.query(
        `
              SELECT id
              FROM users
              WHERE username = ?
            `,
        [username]
      );

      // Save id of guest_user
      const guest_id = guest_info[0].id;

      // Write notification message
      const message = `${host_username} ha aceptado su invitación para unirse a la sala ${room}.`;

      // Save the notification
      await connection.query(
        `INSERT INTO notifications (host_id, guest_id, message) VALUES(?, ?, ?)`,
        [id, guest_id, message]
      );
    }
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { acceptRoomQuery };
