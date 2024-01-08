// Connection require
const { getConnection } = require("../../connection");
// Services requires
const { generateError } = require("../../../services/generateError");

const addFilmQuery = async (id, roomID, url, title, platform, type) => {
  let connection;
  try {
    connection = await getConnection();

    // Select if roomName already exists
    const [postAlreadyExists] = await connection.query(
      `
        SELECT title
        FROM ${type}
        WHERE title = ?
        `,
      [title]
    );

    if (postAlreadyExists.length > 0) {
      throw generateError(
        "There is already a post registered under that name",
        409
      );
    } else {
      // Increase the value of the order_value of existing films
      await connection.query(
        `
          UPDATE ${type}
          SET order_value = order_value + 1
          WHERE order_value > 0
          `
      );

      // Create a new post
      const [newPost] = await connection.query(
        `INSERT INTO ${type} (user_id, room_id, title, url, platform, order_value) VALUES(?, ?, ?, ?, ?, 1)`,
        [id, roomID, title, url, platform]
      );

      return { id: newPost.insertId };
    }
  } finally {
    if (connection) connection.release();
  }
};

module.exports = {
  addFilmQuery,
};
