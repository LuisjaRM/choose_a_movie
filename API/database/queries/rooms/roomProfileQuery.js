// Connection require
const { getConnection } = require("../../connection");

const roomProfileQuery = async (id) => {
  let connection;

  try {
    connection = await getConnection();

    const [room_info] = await connection.query(
      `
      SELECT id, created_by, title, avatar 
      FROM rooms 
      WHERE id = ?
      `,
      [id]
    );

    const [room_users] = await connection.query(
      `
      SELECT u.id, u.username, u.avatar
      FROM users u
      INNER JOIN room_users r ON r.user_id = u.id
      WHERE r.room_id = ? AND u.deleted = 0
      `,
      [room_info[0].id]
    );

    const [room_movies] = await connection.query(
      `
      SELECT id, user_id, title, url, platform, photo, order_value, is_check, created_at
      FROM movies
      WHERE room_id = ?
      `,
      [room_info[0].id]
    );

    const [room_series] = await connection.query(
      `
      SELECT id, user_id, title, url, platform, photo, order_value, is_check, created_at
      FROM series
      WHERE room_id = ?
      `,
      [room_info[0].id]
    );

    const [room_documentaries] = await connection.query(
      `
      SELECT id, user_id, title, url, platform, photo, order_value, is_check, created_at
      FROM documentaries
      WHERE room_id = ?
      `,
      [room_info[0].id]
    );

    const [room_videos] = await connection.query(
      `
      SELECT id, user_id, title, url, platform, photo, order_value, is_check, created_at
      FROM videos
      WHERE room_id = ?
      `,
      [room_info[0].id]
    );

    return {
      room_info,
      room_users,
      room_movies,
      room_series,
      room_documentaries,
      room_videos,
    };
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { roomProfileQuery };
