// Connection require
const { getConnection } = require("../../connection");
// Services require
const { generateError } = require("../../../services/generateError");
const { savePhoto } = require("../../../services/savePhoto");

const updateRoomQuery = async (id, filesAvatar, title) => {
  let connection;
  try {
    connection = await getConnection();

    if (filesAvatar) {
      // Save avatar
      const roomAvatar = await savePhoto(filesAvatar);

      // Update avatar
      await connection.query(
        `
          UPDATE rooms
          SET avatar = ?
          WHERE id = ?
        `,
        [roomAvatar, id]
      );
    }

    if (title) {
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
          [title, id]
        );
      }
    }
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { updateRoomQuery };
