// Connection require
const { getConnection } = require("../../connection");

const deleteFilmQuery = async (type, filmID) => {
  let connection;
  try {
    connection = await getConnection();

    await connection.query(
      `
          UPDATE ${type}
          SET deleted = 1
          WHERE id = ?
        `,
      [filmID]
    );
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { deleteFilmQuery };
