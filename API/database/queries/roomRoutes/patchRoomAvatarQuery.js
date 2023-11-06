// Connection require
const { getConnection } = require("../../connection");

// Services requires
const { savePhoto } = require("../../../services/savePhoto");

const patchRoomAvatarQuery = async ({ id, filesAvatar }) => {
  let connection;
  try {
    connection = await getConnection();

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
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { patchRoomAvatarQuery };
