// Connection require
const { getConnection } = require("../../connection");

const filmProfileQuery = async (type, filmID) => {
  let connection;

  try {
    connection = await getConnection();

    const [film] = await connection.query(
      `
      SELECT m.id, m.user_id, m.title, m.url, m.platform, m.photo, m.created_at, m.is_check, u.username
      FROM ${type} m
      INNER JOIN users u ON u.id = m.user_id
      WHERE m.id = ?
      `,
      [filmID]
    );

    // Add movie order_value
    const [films] = await connection.query(
      `
      SELECT id, order_value
      FROM ${type}
      WHERE NOT order_value = 0
      ORDER BY order_value DESC
      `
    );

    // To select the correct one we reverse the order
    for (let i = 0; i < films.length; i++) {
      films[i].order_value = i + 1;
    }

    let order_value = "";
    films.forEach((film) => {
      if (film.id === Number(filmID)) {
        order_value += film.order_value;
      }
    });

    film[0].order_value = order_value;

    return { film };
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { filmProfileQuery };
