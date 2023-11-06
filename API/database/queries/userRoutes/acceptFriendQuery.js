// Connection require
const { getConnection } = require("../../connection");

// Services require
const { generateError } = require("../../../services/generateError");

const acceptFriendQuery = async (id, username) => {
  let connection;
  try {
    connection = await getConnection();

    const [host_user] = await connection.query(
      `
          SELECT id, deleted
          FROM users
          WHERE username = ?
        `,
      [username]
    );

    if (host_user[0].deleted === 1) {
      throw generateError("The user does not exist", 401);
    } else {
      const [are_friends] = await connection.query(
        `
          SELECT host_id
          FROM friends
          WHERE host_id = ? AND guest_id = ? AND are_friends = 1
          `,
        [host_user[0].id, id]
      );

      if (are_friends.length > 0) {
        throw generateError("They're already friends", 401);
      } else {
        await connection.query(
          `
            UPDATE friends
            SET are_friends = 1
            WHERE host_id = ? AND guest_id = ?
                `,
          [host_user[0].id, id]
        );

        const [guest_user] = await connection.query(
          `
              SELECT id, username
              FROM users
              WHERE id = ?
            `,
          [id]
        );

        // Write notification message
        const message = `${guest_user[0].username} ha aceptado su invitación para ser su amigo.`;

        await connection.query(
          `INSERT INTO notifications (host_id, guest_id, message) VALUES(?, ?, ?)`,
          [guest_user[0].id, host_user[0].id, message]
        );
      }
    }
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { acceptFriendQuery };
