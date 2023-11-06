// Connection require
const { getConnection } = require("../../connection");

// Services require
const { generateError } = require("../../../services/generateError");

const acceptFriendByEmailQuery = async (regCode) => {
  let connection;
  try {
    connection = await getConnection();

    const [alreadyFriends] = await connection.query(
      `
          SELECT host_id, guest_id, email, regCode
          FROM friends
          WHERE regCode = ?
        `,
      [regCode]
    );

    console.log(alreadyFriends[0].guest_id);

    if (alreadyFriends.length < 1) {
      throw generateError("Expired invitation", 401);
    } else {
      let guest_user;
      if (alreadyFriends[0].guest_id != null) {
        // Select id of guest_id
        const [guest_user_info] = await connection.query(
          `
          SELECT id, username
          FROM users
          WHERE id = ?
          `,
          [alreadyFriends[0].guest_id]
        );

        guest_user = guest_user_info;
      } else {
        // Select id of guest_id
        const [guest_user_info] = await connection.query(
          `
          SELECT id, username
          FROM users
          WHERE email = ?
          `,
          [alreadyFriends[0].email]
        );

        guest_user = guest_user_info;
      }

      let guest_id;
      alreadyFriends[0].guest_id === null
        ? (guest_id = guest_user[0].id)
        : (guest_id = alreadyFriends[0].guest_id);

      await connection.query(
        `
          UPDATE friends
          SET guest_id = ?, are_friends = 1, regCode = null
          WHERE regCode = ?
              `,
        [guest_id, regCode]
      );

      // Write notification message
      const message = `${guest_user[0].username} ha aceptado su invitación para ser su amigo.`;

      await connection.query(
        `INSERT INTO notifications (host_id, guest_id, message) VALUES(?, ?, ?)`,
        [guest_id, alreadyFriends[0].host_id, message]
      );
    }
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { acceptFriendByEmailQuery };
