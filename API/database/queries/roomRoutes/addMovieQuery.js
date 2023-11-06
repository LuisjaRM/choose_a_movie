// Connection require
const { getConnection } = require("../../connection");

// Services requires
const { generateError } = require("../../../services/generateError");

const addMovieQuery = async (id, roomID, url, title, plataform, type) => {
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
      await connection.query(
        `
          UPDATE ${type}
          SET order_value = order_value + 1
          WHERE id
          `
      );

      // Create a new post
      const [newPost] = await connection.query(
        `INSERT INTO ${type} (user_id, room_id, title, url, plataform, order_value) VALUES(?, ?, ?, ?, ?, 1)`,
        [id, roomID, title, url, plataform]
      );

      return { id: newPost.insertId };
    }
  } finally {
    if (connection) connection.release();
  }
};

module.exports = {
  addMovieQuery,
};
