// Services require
const { generateError } = require("../../../services/generateError");

// Connection require
const { getConnection } = require("../../connection");

const patchRoomTitleQuery = async ({ roomID, title }) => {
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
      [title]
    );

    if (roomAlreadyExists.length > 0) {
      throw generateError(
        "There is already a room registered under that name",
        409
      );
    } else {
      // Update title
      await connection.query(
        `
                UPDATE rooms
                SET title = ?
                WHERE id = ?
              `,
        [title, roomID]
      );
    }
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { patchRoomTitleQuery };
