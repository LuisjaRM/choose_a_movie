// Connection require
const { getConnection } = require("../../connection");

const sendRequestRoomQuery = async (id, roomID) => {
  let connection;
  try {
    connection = await getConnection();

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
    const room_name = room[0].title;

    // Write notification message
    const message = `${host_username} ha solicitado unirse a la sala ${room_name}.`;

    // Create notification
    await connection.query(
      `INSERT INTO notifications (host_id, guest_id, message) VALUES(?, ?, ?)`,
      [id, guest_id, message]
    );
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { sendRequestRoomQuery };
