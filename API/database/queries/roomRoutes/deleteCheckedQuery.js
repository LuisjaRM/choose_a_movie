// Connection require
const { getConnection } = require("../../connection");

const deleteCheckedQuery = async (type, moviesChecked) => {
  let connection;
  try {
    connection = await getConnection();

    console.log(moviesChecked);

    for (let i = 0; i < moviesChecked.length; i++) {
      const movieID = moviesChecked[i].id;

      await connection.query(
        `
          UPDATE ${type}
          SET deleted = 1
          WHERE id = ?
        `,
        [movieID]
      );
    }
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { deleteCheckedQuery };
