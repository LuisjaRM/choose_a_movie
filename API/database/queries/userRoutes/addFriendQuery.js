// Connection require
const { getConnection } = require("../../connection");

// Service require
const { generateError } = require("../../../services/generateError");
const { sendMail } = require("../../../services/sendMail");

// npm requires
const { v4: uuidv4 } = require("uuid");

const addFriendQuery = async (id, username, email) => {
  let connection;
  try {
    connection = await getConnection();

    // With username
    if (username != "") {
      const [guest_user] = await connection.query(
        `
        SELECT id, deleted
        FROM users
        WHERE username = ?
        `,
        [username]
      );

      // Check if the username exists
      if (guest_user.length === 0 || guest_user[0].deleted === 1) {
        throw generateError(
          "There is no user registered with this username",
          409
        );
      } else {
        const [host_user] = await connection.query(
          `
          SELECT username
          FROM users
          WHERE id = ?
          `,
          [id]
        );

        // Check if the username is the same that the host_user
        if (host_user[0].username === username) {
          throw generateError(
            "You cannot send a friend request to yourself",
            409
          );
        } else {
          const [relationship] = await connection.query(
            `
            SELECT are_friends
            FROM friends
            WHERE host_id = ? AND guest_id = ?
            `,
            [id, guest_user[0].id]
          );

          // Create relationship if not exists
          if (relationship.length < 1) {
            await connection.query(
              `INSERT INTO friends (host_id, guest_id) VALUES(?, ?)`,
              [id, guest_user[0].id]
            );
          }

          // Write notification message
          const message = `${host_user[0].username} te ha enviado una invitación para ser su amigo.`;

          // Create notification
          await connection.query(
            `INSERT INTO notifications (host_id, guest_id, message) VALUES(?, ?, ?)`,
            [id, guest_user[0].id, message]
          );
        }
      }
    }

    // With email
    if (email != "") {
      const [host_user] = await connection.query(
        `
        SELECT username, email
        FROM users
        WHERE id = ?
        `,
        [id]
      );

      // Check if the email is the same that the host_user
      if (host_user[0].email === email) {
        throw generateError(
          "You cannot send a friend request to yourself",
          409
        );
      } else {
        // Create regCode
        const regCode = uuidv4();

        // Check if guest_user is already registered
        const [guest_user] = await connection.query(
          `
          SELECT id, username
          FROM users
          WHERE email = ? AND deleted = 0
          `,
          [email]
        );

        // Guest_user is already registered
        if (guest_user.length > 0) {
          const [relationship] = await connection.query(
            `
              SELECT are_friends
              FROM friends
              WHERE host_id = ? AND guest_id = ?
            `,
            [id, guest_user[0].id]
          );

          // Check if relationship is already created
          if (relationship.length < 1) {
            await connection.query(
              `INSERT INTO friends (host_id, guest_id, regCode) VALUES(?, ?, ?)`,
              [id, guest_user[0].id, regCode]
            );
          } else {
            await connection.query(
              `
              UPDATE friends
              SET regCode = ?
              WHERE host_id = ? AND guest_id = ?
              `,
              [regCode, id, guest_user[0].id]
            );
          }
          // Guest_user is not registered
        } else {
          const [relationship] = await connection.query(
            `
            SELECT email
            FROM friends
            WHERE host_id = ? AND email = ?
            `,
            [id, email]
          );

          // Check if relationship is already created
          if (relationship.length > 0) {
            throw generateError("You have already sent an invitation", 409);
          } else {
            // Create relationship
            await connection.query(
              `INSERT INTO friends (host_id, email, regCode) VALUES(?, ?, ?)`,
              [id, email, regCode]
            );
          }
        }

        const parameter =
          guest_user.length > 0 ? guest_user[0].username : email;

        // Write the body of the invitation email
        const mailBody = `
              ${host_user[0].username} te ha enviado una invitación de amistad.
              Haz click en el siguiente enlace para aceptar la invitación.
              ${process.env.PUBLIC_HOST}add-friend/${parameter}/${regCode}
              Atentamente ChooseMovie.`;

        const htmlBody = `
              <section>
                <p>${host_user[0].username} te ha enviado una invitación de amistad.</p>
                <p>Haz click en el siguiente enlace para aceptar la invitación.</p>
                <p>${process.env.PUBLIC_HOST}add-friend/${parameter}/${regCode}</p>
                <p>Atentamente ChooseMovie.</p>
                </section>`;

        // Send the invitation email
        await sendMail(email, "Solicitud de amistad", mailBody, htmlBody);
      }
    }
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { addFriendQuery };
