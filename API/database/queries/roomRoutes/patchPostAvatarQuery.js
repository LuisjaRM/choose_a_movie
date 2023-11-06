// Connection require
const { getConnection } = require("../../connection");

// Services requires
const { savePhoto } = require("../../../services/savePhoto");

const patchPostAvatarQuery = async ({ type, id, filesAvatar }) => {
  let connection;
  try {
    connection = await getConnection();

    // Save avatar
    const postAvatar = await savePhoto(filesAvatar);

    // Update avatar
    await connection.query(
      `
      UPDATE ${type}
      SET photo = ?
      WHERE id = ?
      `,
      [postAvatar, id]
    );
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { patchPostAvatarQuery };
