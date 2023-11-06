// Connection require
const { getConnection } = require("../../connection");

const deleteMovieQuery = async (type, movieID) => {
  let connection;
  try {
    connection = await getConnection();

    await connection.query(
      `
          UPDATE ${type}
          SET deleted = 1
          WHERE id = ?
        `,
      [movieID]
    );
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { deleteMovieQuery };
