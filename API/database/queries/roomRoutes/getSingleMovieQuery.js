// Connection require
const { getConnection } = require("../../connection");

const getSingleMovieQuery = async (type, movieID) => {
  let connection;

  try {
    connection = await getConnection();

    const [movie] = await connection.query(
      `
      SELECT m.id, m.user_id, m.title, m.url, m.plataform, m.photo, m.created_at, m.is_check, u.username
      FROM ${type} m
      INNER JOIN users u ON u.id = m.user_id
      WHERE m.id = ?
      `,
      [movieID]
    );

    const [movies] = await connection.query(
      `
      SELECT id, order_value
      FROM ${type}
      WHERE NOT order_value = 0
      ORDER BY order_value DESC
      `
    );

    for (let i = 0; i < movies.length; i++) {
      movies[i].order_value = i + 1;
    }

    let order_value = "";
    movies.forEach((movie) => {
      if (movie.id === Number(movieID)) {
        order_value += movie.order_value;
      }
    });

    movie[0].order_value = order_value;

    return { movie };
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { getSingleMovieQuery };
