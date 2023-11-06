// Connection require
const { getConnection } = require("../../connection");

const patchIsCheckQuery = async ({ movieID, type, checkOrDescheck }) => {
  let connection;

  try {
    connection = await getConnection();

    if (checkOrDescheck === "check") {
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

      await connection.query(
        `
          UPDATE ${type}
          SET order_value = 0
          WHERE id = ?
        `,
        [movieID]
      );

      await connection.query(
        `
          UPDATE ${type}
          SET is_check = 1
          WHERE id = ?
        `,
        [movieID]
      );

      const [movies_up_info] = await connection.query(
        `
          SELECT id
          FROM ${type}
          WHERE order_value > ? AND is_check = 0
        `,
        [order_value]
      );

      if (movies_up_info.length > 0) {
        let querySentenceUp = "";
        movies_up_info.forEach((movie) => {
          querySentenceUp += `id = ${movie.id} OR `;
        });
        querySentenceUp = querySentenceUp.substring(
          0,
          querySentenceUp.length - 4
        );

        await connection.query(
          `
                  UPDATE ${type}
                  SET order_value = order_value - 1
                  WHERE ${querySentenceUp}
                `
        );
      }
    }

    if (checkOrDescheck === "descheck") {
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

      await connection.query(
        `
            UPDATE ${type}
            SET is_check = 0
            WHERE id = ?
          `,
        [movieID]
      );

      const [movies_up_info] = await connection.query(
        `
            SELECT id
            FROM ${type}
            WHERE order_value > ? AND is_check = 0
          `,
        [order_value]
      );

      if (movies_up_info.length > 0) {
        let querySentenceUp = "";
        movies_up_info.forEach((movie) => {
          querySentenceUp += `id = ${movie.id} OR `;
        });
        querySentenceUp = querySentenceUp.substring(
          0,
          querySentenceUp.length - 4
        );

        await connection.query(
          `
              UPDATE ${type}
              SET order_value = order_value + 1
              WHERE ${querySentenceUp}
            `
        );

        await connection.query(
          `
              UPDATE ${type}
              SET order_value = 1
              WHERE id = ?
            `,
          [movieID]
        );
      }
    }
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { patchIsCheckQuery };
