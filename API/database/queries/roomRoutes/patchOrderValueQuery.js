// Connection require
const { getConnection } = require("../../connection");

const patchOrderValueQuery = async ({ movieID, type, upOrdown }) => {
  let connection;

  try {
    connection = await getConnection();

    if (upOrdown === "up") {
      // Select actual order_value
      const [select_movie_info] = await connection.query(
        `
          SELECT order_value
          FROM ${type}
          WHERE id = ?
        `,
        [movieID]
      );

      const order_value = select_movie_info[0].order_value;
      const next_order_value = select_movie_info[0].order_value + 1;

      // Select max order_value
      const [max_movie_info] = await connection.query(
        `
          SELECT MAX(order_value) AS order_value
          FROM ${type}
        `
      );

      const max_order_value = max_movie_info[0].order_value;

      if (order_value != max_order_value) {
        // Update movie order_value
        const [select_next_info] = await connection.query(
          `
            SELECT id
            FROM ${type}
            WHERE order_value = ?
          `,
          [next_order_value]
        );

        const next_id = select_next_info[0].id;

        await connection.query(
          `
            UPDATE ${type}
            SET order_value = order_value + 1
            WHERE id = ?
          `,
          [movieID]
        );

        await connection.query(
          `
            UPDATE ${type}
            SET order_value = order_value - 1
            WHERE id = ?
          `,
          [next_id]
        );
      }
    }

    if (upOrdown === "down") {
      // Select actual order_value
      const [select_movie_info] = await connection.query(
        `
          SELECT order_value
          FROM ${type}
          WHERE id = ?
        `,
        [movieID]
      );

      const order_value = select_movie_info[0].order_value;
      const next_order_value = select_movie_info[0].order_value - 1;

      const min_order_value = 1;

      if (order_value != min_order_value) {
        // Update movie order_value
        const [select_next_info] = await connection.query(
          `
            SELECT id
            FROM ${type}
            WHERE order_value = ?
          `,
          [next_order_value]
        );

        const next_id = select_next_info[0].id;

        await connection.query(
          `
            UPDATE ${type}
            SET order_value = order_value - 1
            WHERE id = ?
          `,
          [movieID]
        );

        await connection.query(
          `
            UPDATE ${type}
            SET order_value = order_value + 1
            WHERE id = ?
          `,
          [next_id]
        );
      }
    }
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { patchOrderValueQuery };
