// Connection require
const { getConnection } = require("../../connection");

// Services require
const { sendMail } = require("../../../services/sendMail");
const { generateError } = require("../../../services/generateError");

// Npm require
const { v4: uuidv4 } = require("uuid");

const postRecoverPasswordQuery = async (username, email) => {
  let connection;
  try {
    connection = await getConnection();

    let userEmail;
    let userUsername;
    if (username != undefined) {
      const [userExists] = await connection.query(
        `SELECT username, email, active, deleted FROM users WHERE username = ?`,
        [username]
      );

      if (userExists.length < 1 || userExists[0].deleted === 1) {
        throw generateError(
          "There is no user registered with this username",
          409
        );
      } else {
        if (userExists[0].active === 0) {
          throw generateError("The user is not verified yet", 409);
        } else {
          userEmail = userExists[0].email;
          userUsername = username;
        }
      }
    } else {
      const [userExists] = await connection.query(
        `SELECT username, email, active, deleted FROM users WHERE email = ?`,
        [email]
      );

      if (userExists.length < 1 || userExists[0].deleted === 1) {
        throw generateError(
          "There is no user registered with this email address",
          409
        );
      } else {
        if (userExists[0].active === 0) {
          throw generateError("The user is not verified yet", 409);
        } else {
          userEmail = email;
          userUsername = userExists[0].username;
        }
      }
    }

    if (userEmail != "" && userUsername != "") {
      // Generate recoverCode
      const recoverCode = uuidv4();

      // Write the body of the recover password email
      const mailBody = `
      Se ha solicitado un cambio de contraseña en ChooseMovie para el nombre de usuario ${userUsername}.
      Si no has solicitado el cambio, por favor asegura tu contraseña o ponte en contacto con nosotros contestando a este correo.
      El código de recuperación es: ${recoverCode}
      Atentamente ChooseMovie.`;

      const htmlBody = `
      <section>
        <p>Se ha solicitado un cambio de contraseña en ChooseMovie para el nombre de usuario ${userUsername}.</p>
        <p>Si no has solicitado el cambio, por favor asegura tu contraseña o ponte en contacto con nosotros contestando a este correo.</p>
        <p>El código de recuperación es: ${recoverCode}</p>
        <p>Atentamente ChooseMovie.</p>
      </section>
      `;

      // Call function sendMail
      await sendMail(
        userEmail,
        "Solicitud de cambio de contraseña",
        mailBody,
        htmlBody
      );

      // Set recovercode
      await connection.query(
        `
            UPDATE users
            SET recoverCode = ?, lastAuthUpdate = ?
            WHERE email = ? AND deleted = 0
          `,
        [recoverCode, new Date(), userEmail]
      );
    }
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { postRecoverPasswordQuery };
