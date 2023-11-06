// Connection require
const { getConnection } = require("../../connection");

// Services requires
const { generateError } = require("../../../services/generateError");

const createRoomQuery = async (id, roomName) => {
  let connection;
  try {
    connection = await getConnection();

    // Select if roomName already exists
    const [roomAlreadyExists] = await connection.query(
      `
        SELECT title
        FROM rooms
        WHERE title = ?
        `,
      [roomName]
    );

    if (roomAlreadyExists.length > 0) {
      throw generateError(
        "There is already a room registered under that name",
        409
      );
    } else {
      // Create a new user
      const [newRoom] = await connection.query(
        `INSERT INTO rooms (created_by, title) VALUES(?, ?)`,
        [id, roomName]
      );

      await connection.query(
        `INSERT INTO room_users (user_id, room_id) VALUES(?, ?)`,
        [id, newRoom.insertId]
      );

      return { id: newRoom.insertId };
    }
  } finally {
    if (connection) connection.release();
  }
};

module.exports = {
  createRoomQuery,
};
