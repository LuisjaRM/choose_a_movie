// Connection require
const { getConnection } = require("../../connection");

const patchMovieQuery = async ({ movieID, type, title, url, plataform }) => {
  let connection;

  try {
    connection = await getConnection();

    if (title != undefined) {
      // Update title
      await connection.query(
        `
          UPDATE ${type}
          SET title = ?
          WHERE id = ?
        `,
        [title, movieID]
      );
    }

    if (url != undefined) {
      // Update title
      await connection.query(
        `
          UPDATE ${type}
          SET url = ?
          WHERE id = ?
        `,
        [url, movieID]
      );
    }

    if (plataform != undefined) {
      // Update title
      await connection.query(
        `
          UPDATE ${type}
          SET plataform = ?
          WHERE id = ?
        `,
        [plataform, movieID]
      );
    }
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { patchMovieQuery };
