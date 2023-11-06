// Connection require
const { getConnection } = require("../../connection");

const searchMyRoomQuery = async (id, search) => {
  let connection;

  try {
    connection = await getConnection();

    const [user_rooms] = await connection.query(
      `
      SELECT r.id, r.title, r.avatar
      FROM rooms r
      INNER JOIN room_users u ON u.room_id = r.id
      WHERE u.user_id = ? AND deleted = 0
      ORDER BY r.title ASC
      `,
      [id]
    );

    let rooms = [];
    user_rooms.forEach((room) => {
      const title = room.title.toUpperCase();
      if (title.includes(search.toUpperCase())) rooms.push(room);
    });

    return rooms;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { searchMyRoomQuery };
