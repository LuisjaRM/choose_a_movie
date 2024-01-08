// Connection require
const { getConnection } = require("../../connection");

const searchFriendQuery = async (id, search) => {
  let connection;

  try {
    connection = await getConnection();

    const [friendsInfo] = await connection.query(
      `
          SELECT host_id, guest_id
          FROM friends
          WHERE host_id = ? AND are_friends = 1 OR guest_id = ? AND are_friends = 1
        `,
      [id, id]
    );

    // Save in array the friends id
    const friendsIds = [];
    friendsInfo.forEach((friendInfo) => {
      friendInfo.host_id != id && friendsIds.push(friendInfo.host_id);
      friendInfo.guest_id != id && friendsIds.push(friendInfo.guest_id);
    });

    if (friendsIds.length > 0) {
      let allFriends;
      if (friendsIds.length > 0) {
        // Define query sentence of where clause with all friends id
        let querySentence = "";
        friendsIds.forEach((friendId) => {
          querySentence += `id = ${friendId} AND deleted = 0 OR `;
        });
        querySentence = querySentence.substring(0, querySentence.length - 3);

        const [userFriends] = await connection.query(
          `
              SELECT id, username, avatar
              FROM users
              WHERE ${querySentence}
            `
        );

        allFriends = userFriends;
      }

      let friends = [];
      allFriends.forEach((friend) => {
        const username = friend.username.toUpperCase();
        if (username.includes(search.toUpperCase())) friends.push(friend);
      });

      return friends;
    }

    const friends = [];
    return friends;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { searchFriendQuery };
