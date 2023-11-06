// Connection require
const { getConnection } = require("../../connection");

const deleteUserQuery = async (id) => {
  let connection;
  try {
    connection = await getConnection(id);

    // Delete all user references in other tables
    const [rooms] = await connection.query(
      `
        SELECT id
        FROM rooms
        WHERE created_by = ? AND deleted = 0
        `,
      [id]
    );

    const rooms_ids = [];
    rooms.forEach((room) => {
      rooms_ids.push(room.id);
    });

    if (rooms_ids.length > 0) {
      let querySentence = "";
      rooms_ids.forEach((room_id) => {
        querySentence += `room_id = ${room_id} AND NOT user_id = ${id} OR `;
      });
      querySentence = querySentence.substring(0, querySentence.length - 3);

      const [room_users] = await connection.query(
        `
          SELECT user_id, room_id
          FROM room_users
          WHERE ${querySentence}
          `
      );

      if (room_users.length > 0) {
        for (let i = 0; i < room_users.length; i++) {
          await connection.query(
            `
            UPDATE rooms
            SET created_by = ?
            WHERE id = ?
        `,
            [room_users[i].user_id, room_users[i].room_id]
          );
        }
      }
    }

    // Delete user
    await connection.query(
      `
        UPDATE users
        SET deleted = 1
        WHERE id = ?
        `,
      [id]
    );
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { deleteUserQuery };
