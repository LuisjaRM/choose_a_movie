// Connection require
const { getConnection } = require("../../connection");

const deleteRoomQuery = async (id) => {
  let connection;
  try {
    connection = await getConnection();

    // Delete all films of this room
    await connection.query(
      `
          UPDATE movies
          SET deleted = 1
          WHERE room_id = ?
        `,
      [id]
    );

    await connection.query(
      `
          UPDATE series
          SET deleted = 1
          WHERE room_id = ?
        `,
      [id]
    );

    await connection.query(
      `
          UPDATE documentaries
          SET deleted = 1
          WHERE room_id = ?
        `,
      [id]
    );

    await connection.query(
      `
          UPDATE videos
          SET deleted = 1
          WHERE room_id = ?
        `,
      [id]
    );

    // Delete room
    await connection.query(
      `
          UPDATE rooms
          SET deleted = 1
          WHERE id = ?
        `,
      [id]
    );
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { deleteRoomQuery };
