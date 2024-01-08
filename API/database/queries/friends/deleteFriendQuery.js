// Connection require
const { getConnection } = require("../../connection");

const deleteFriendQuery = async (user_id, friend_id) => {
  let connection;
  try {
    connection = await getConnection();

    // Remove friend of user rooms
    const [user_rooms] = await connection.query(
      `
        SELECT r.id
        FROM rooms r
        INNER JOIN room_users u ON r.id = u.room_id
        WHERE r.created_by = ? AND u.user_id = ?
      `,
      [user_id, friend_id]
    );

    let user_rooms_id = [];
    user_rooms.forEach((room) => {
      user_rooms_id.push(room.id);
    });

    if (user_rooms_id.length > 0) {
      let querySentence = "";
      user_rooms_id.forEach((room_id) => {
        querySentence += `room_id = ${room_id} AND user_id = ${friend_id} OR `;
      });
      querySentence = querySentence.substring(0, querySentence.length - 4);

      await connection.query(
        `
          DELETE
          FROM room_users
          WHERE ${querySentence}
        `
      );
    }

    // Remove user of friends rooms
    const [friend_rooms] = await connection.query(
      `
        SELECT r.id
        FROM rooms r
        INNER JOIN room_users u ON r.id = u.room_id
        WHERE r.created_by = ? AND u.user_id = ?
      `,
      [friend_id, user_id]
    );

    let friend_rooms_id = [];
    friend_rooms.forEach((room) => {
      friend_rooms_id.push(room.id);
    });

    if (friend_rooms_id.length > 0) {
      let querySentence = "";
      friend_rooms_id.forEach((room_id) => {
        querySentence += `room_id = ${room_id} AND user_id = ${user_id} OR `;
      });
      querySentence = querySentence.substring(0, querySentence.length - 4);

      await connection.query(
        `
          DELETE
          FROM room_users
          WHERE ${querySentence}
        `
      );
    }

    // Delete friend relationship
    await connection.query(
      `
        DELETE
        FROM friends
        WHERE host_id = ? AND guest_id = ? OR host_id = ? AND guest_id = ?
      `,
      [user_id, friend_id, friend_id, user_id]
    );
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { deleteFriendQuery };
