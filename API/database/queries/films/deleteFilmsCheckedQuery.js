// Connection require
const { getConnection } = require("../../connection");

const deleteFilmsCheckedQuery = async (type) => {
  let connection;
  try {
    connection = await getConnection();

    const [filmsChecked] = await connection.query(
      `
        SELECT id
        FROM ${type}
        WHERE is_check = 1
      `
    );

    for (let i = 0; i < filmsChecked.length; i++) {
      const filmID = filmsChecked[i].id;

      await connection.query(
        `
          UPDATE ${type}
          SET deleted = 1 AND order_value = 0
          WHERE id = ?
        `,
        [filmID]
      );
    }
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { deleteFilmsCheckedQuery };
