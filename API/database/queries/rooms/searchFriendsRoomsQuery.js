// Connection require
const { getConnection } = require("../../connection");

const searchFriendsRoomsQuery = async (id, search) => {
  let connection;

  try {
    connection = await getConnection();

    const [friends] = await connection.query(
      `
      SELECT host_id, guest_id
      FROM friends
      WHERE  host_id = ? OR guest_id = ?
      `,
      [id, id]
    );

    let friendsID = [];
    friends.forEach((friend) => {
      friend.host_id != id && friendsID.push(friend.host_id);
      friend.guest_id != id && friendsID.push(friend.guest_id);
    });

    let querySentence = "";
    friendsID.forEach((friendID) => {
      querySentence += `NOT u.user_id = ${id} AND r.deleted = 0 AND r.created_by = ${friendID} OR `;
    });
    querySentence = querySentence.substring(0, -4);

    const [allFriendsRooms] = await connection.query(
      `
      SELECT DISTINCT r.id, r.title, r.avatar
      FROM rooms r
      INNER JOIN room_users u ON u.room_id = r.id
      WHERE ${querySentence}
      ORDER BY r.title ASC
      `
    );

    let friendsRooms = [];
    allFriendsRooms.forEach((room) => {
      const title = room.title.toUpperCase();
      if (title.includes(search.toUpperCase())) friendsRooms.push(room);
    });

    return friendsRooms;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { searchFriendsRoomsQuery };
