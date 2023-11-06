// Connection require
const { getConnection } = require("../../connection");

const searchNotMyRoomQuery = async (id, search) => {
  let connection;

  try {
    connection = await getConnection();

    const [not_user_rooms] = await connection.query(
      `
      SELECT DISTINCT r.id, r.title, r.avatar
      FROM rooms r
      INNER JOIN room_users u ON u.room_id = r.id
      WHERE NOT u.user_id = ? AND deleted = 0
      ORDER BY r.title ASC
      `,
      [id]
    );

    const [user_rooms] = await connection.query(
      `
      SELECT DISTINCT r.id, r.title, r.avatar
      FROM rooms r
      INNER JOIN room_users u ON u.room_id = r.id
      WHERE u.user_id = ? AND deleted = 0
      ORDER BY r.title ASC
      `,
      [id]
    );

    const user_rooms_id = [];
    user_rooms.forEach((user_room) => {
      user_rooms_id.push(user_room.id);
    });

    const rooms = [];
    not_user_rooms.forEach((not_user_room) => {
      if (!user_rooms_id.includes(not_user_room.id)) {
        rooms.push(not_user_room);
      }
    });

    let allRooms = [];
    rooms.forEach((room) => {
      const title = room.title.toUpperCase();
      if (title.includes(search.toUpperCase())) allRooms.push(room);
    });

    return allRooms;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { searchNotMyRoomQuery };
