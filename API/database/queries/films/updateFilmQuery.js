// Connection require
const { getConnection } = require("../../connection");
// Services require
const { savePhoto } = require("../../../services/savePhoto");

const updateFilmQuery = async (
  type,
  filmID,
  filesPhoto,
  title,
  url,
  platform,
  checkOrDescheck,
  upOrdown
) => {
  let connection;

  try {
    connection = await getConnection();

    if (filesPhoto) {
      // Save photo
      const filmPhoto = await savePhoto(filesPhoto);

      // Update photo
      await connection.query(
        `
          UPDATE ${type}
          SET photo = ?
          WHERE id = ?
        `,
        [filmPhoto, filmID]
      );
    }

    if (title) {
      // Update title
      await connection.query(
        `
          UPDATE ${type}
          SET title = ?
          WHERE id = ?
        `,
        [title, filmID]
      );
    }

    if (url) {
      // Update title
      await connection.query(
        `
          UPDATE ${type}
          SET url = ?
          WHERE id = ?
        `,
        [url, filmID]
      );
    }

    if (platform) {
      // Update title
      await connection.query(
        `
          UPDATE ${type}
          SET platform = ?
          WHERE id = ?
        `,
        [platform, filmID]
      );
    }

    if (checkOrDescheck) {
      if (checkOrDescheck === "check") {
        // Select actual order_value
        const [select_film_info] = await connection.query(
          `
            SELECT order_value
            FROM ${type}
            WHERE id = ?
          `,
          [filmID]
        );
        const order_value = select_film_info[0].order_value;

        await connection.query(
          `
            UPDATE ${type}
            SET order_value = 0, is_check = 1
            WHERE id = ?
          `,
          [filmID]
        );

        // Change the order_value of the rest of the affected films
        const [films_up_info] = await connection.query(
          `
            SELECT id
            FROM ${type}
            WHERE order_value > ? AND is_check = 0
          `,
          [order_value]
        );

        if (films_up_info.length > 0) {
          let querySentenceUp = "";
          films_up_info.forEach((film) => {
            querySentenceUp += `id = ${film.id} OR `;
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
        await connection.query(
          `
            UPDATE ${type}
            SET is_check = 0
            WHERE id = ?
          `,
          [filmID]
        );

        // Change the order_value of the rest of the affected films includes
        const [films_up_info] = await connection.query(
          `
            SELECT id
            FROM ${type}
            WHERE order_value > 0 AND is_check = 0
          `
        );

        if (films_up_info.length > 0) {
          let querySentenceUp = "";
          films_up_info.forEach((film) => {
            querySentenceUp += `id = ${film.id} OR `;
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
        }

        // Change order_value of this film
        await connection.query(
          `
            UPDATE ${type}
            SET order_value = 1
            WHERE id = ?
          `,
          [filmID]
        );
      }
    }

    if (upOrdown) {
      if (upOrdown === "up") {
        // Select actual order_value
        const [select_movie_info] = await connection.query(
          `
            SELECT order_value
            FROM ${type}
            WHERE id = ?
          `,
          [filmID]
        );

        const order_value = select_movie_info[0].order_value;
        console.log("up", order_value);
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
            [filmID]
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
          [filmID]
        );

        const order_value = select_movie_info[0].order_value;
        console.log("down", order_value);
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
            [filmID]
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
    }
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { updateFilmQuery };
