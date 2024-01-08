// Connection require
const { getConnection } = require("../../connection");

// Services require
const { generateError } = require("../../../services/generateError");

const acceptFriendQuery = async (id, item) => {
  let connection;
  try {
    connection = await getConnection();

    // Check whether the invitation is by email or by username
    let regCode = "";
    let username = "";
    item.length > 15 ? (regCode = item) : (username = item);

    // Invitation with username
    if (username != "") {
      const [host_user] = await connection.query(
        `
            SELECT id
            FROM users
            WHERE username = ? AND deleted = 0
          `,
        [username]
      );

      // Check if user was deleted
      if (host_user.length < 1) {
        throw generateError("The user does not exist", 401);
      } else {
        // Save host_id
        const host_id = host_user[0].id;

        const [relatonship] = await connection.query(
          `
            SELECT host_id, are_friends
            FROM friends
            WHERE host_id = ? AND guest_id = ?
            `,
          [host_id, id]
        );

        // Check if was already friends
        if (relatonship.length < 1) {
          throw generateError("Expired invitation", 401);
        } else if (relatonship[0].are_friends === 1) {
          throw generateError("They're already friends", 401);
        } else {
          await connection.query(
            `
              UPDATE friends
              SET are_friends = 1
              WHERE host_id = ? AND guest_id = ?
            `,
            [host_id, id]
          );

          const [guest_user] = await connection.query(
            `
              SELECT username
              FROM users
              WHERE id = ?
            `,
            [id]
          );

          // Save guest_username
          const guest_username = guest_user[0].username;

          // Write notification message
          const message = `${guest_username} ha aceptado su invitación para ser su amigo.`;

          await connection.query(
            `INSERT INTO notifications (host_id, guest_id, message) VALUES(?, ?, ?)`,
            [id, host_id, message]
          );
        }
      }
    }

    // Invitation with email
    if (regCode != "") {
      console.log("regCode");
      const [are_friends] = await connection.query(
        `
          SELECT host_id, email, regCode
          FROM friends
          WHERE regCode = ?
        `,
        [regCode]
      );

      const host_id = are_friends[0].host_id;

      // Check if the invitation was expired
      if (are_friends.length < 1) {
        throw generateError("Expired invitation", 401);
      } else {
        await connection.query(
          `
            UPDATE friends
            SET are_friends = 1, guest_id = ?, email = null, regCode = null
            WHERE host_id = ? AND regCode = ?
          `,
          [id, host_id, regCode]
        );

        const [guest_user] = await connection.query(
          `
              SELECT username
              FROM users
              WHERE id = ?
            `,
          [id]
        );

        // Save guest_username
        const guest_username = guest_user[0].username;

        // Write notification message
        const message = `${guest_username} ha aceptado su invitación para ser su amigo.`;

        await connection.query(
          `INSERT INTO notifications (host_id, guest_id, message) VALUES(?, ?, ?)`,
          [id, host_id, message]
        );
      }
    }
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { acceptFriendQuery };
