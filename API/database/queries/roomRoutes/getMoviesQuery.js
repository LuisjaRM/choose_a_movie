// Connection require
const { getConnection } = require("../../connection");

const getMoviesQuery = async (roomID) => {
  let connection;

  try {
    connection = await getConnection();

    const [movies] = await connection.query(
      `
      SELECT id, user_id, title, url, plataform, photo, order_value, is_check
      FROM movies
      WHERE room_id = ? AND deleted = 0
      ORDER BY order_value DESC
      `,
      [roomID]
    );

    const [series] = await connection.query(
      `
      SELECT id, user_id, title, url, plataform, photo, order_value, is_check
      FROM series
      WHERE room_id = ? AND deleted = 0
      ORDER BY order_value DESC
      `,
      [roomID]
    );

    const [documentaries] = await connection.query(
      `
      SELECT id, user_id, title, url, plataform, photo, order_value, is_check
      FROM documentaries
      WHERE room_id = ? AND deleted = 0
      ORDER BY order_value DESC
      `,
      [roomID]
    );

    const [videos] = await connection.query(
      `
      SELECT id, user_id, title, url, plataform, photo, order_value, is_check
      FROM videos
      WHERE room_id = ? AND deleted = 0
      ORDER BY order_value DESC
      `,
      [roomID]
    );

    return { movies, series, documentaries, videos };
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { getMoviesQuery };
