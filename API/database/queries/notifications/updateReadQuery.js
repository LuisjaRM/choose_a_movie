// Connection require
const { getConnection } = require("../../connection");

const updateReadQuery = async (id) => {
  let connection;
  try {
    connection = await getConnection();

    await connection.query(
      `
      UPDATE notifications
      SET readed = 1
      WHERE id = ?
          `,
      [id]
    );
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { updateReadQuery };
