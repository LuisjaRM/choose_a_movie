// Connection require
const { getConnection } = require("../../connection");

const deleteRoomQuery = async (type, roomTitle) => {
  let connection;
  try {
    connection = await getConnection();

    const [room_info] = await connection.query(
      `
          SELECT id
          FROM rooms
          WHERE title = ?
        `,
      [roomTitle]
    );

    room_id = room_info[0].id;

    await connection.query(
      `
          UPDATE movies
          SET deleted = 1
          WHERE room_id = ?
        `,
      [room_id]
    );

    await connection.query(
      `
          UPDATE series
          SET deleted = 1
          WHERE room_id = ?
        `,
      [room_id]
    );

    await connection.query(
      `
          UPDATE documentaries
          SET deleted = 1
          WHERE room_id = ?
        `,
      [room_id]
    );

    await connection.query(
      `
          UPDATE videos
          SET deleted = 1
          WHERE room_id = ?
        `,
      [room_id]
    );

    await connection.query(
      `
          UPDATE rooms
          SET deleted = 1
          WHERE id = ?
        `,
      [room_id]
    );
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { deleteRoomQuery };
