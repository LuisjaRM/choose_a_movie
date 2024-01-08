// Connection require
const { getConnection } = require("../../connection");
// npm require
const { v4: uuidv4 } = require("uuid");
// Services requires
const { generateError } = require("../../../services/generateError");
const { sendMail } = require("../../../services/sendMail");
const { savePhoto } = require("../../../services/savePhoto");

const updateProfileQuery = async ({
  id,
  filesAvatar,
  username,
  email,
  phone,
}) => {
  let connection;
  try {
    connection = await getConnection();

    const [user_info] = await connection.query(
      `
        SELECT username, email, phone
        FROM users
        WHERE id = ?
      `,
      [id]
    );

    if (filesAvatar) {
      // Save avatar
      const userAvatar = await savePhoto(filesAvatar);

      // Update avatar
      await connection.query(
        `
          UPDATE users
          SET avatar = ?
          WHERE id = ?
        `,
        [userAvatar, id]
      );
    }

    if (username) {
      //  Check is not the same that old username
      if (user_info[0].username === username) {
        throw generateError(
          "You are already registered with this username",
          409
        );
      }

      // Check that new username is not used by other user
      const [existsUsername] = await connection.query(
        `
          SELECT username
          FROM users
          WHERE username = ?
        `,
        [username]
      );

      if (existsUsername.length > 0) {
        throw generateError(
          "There is already a registered user with this username",
          409
        );
      }

      // Update user
      await connection.query(
        `
          UPDATE users
          SET username = ?
          WHERE id = ?
        `,
        [username, id]
      );
    }

    if (email) {
      //  Check is not the same that old email
      if (user_info[0].email === email) {
        throw generateError("You are already registered with this email", 409);
      }

      // Check that new email is not used by other user
      const [existsEmail] = await connection.query(
        `
          SELECT email
          FROM users
          WHERE email = ?
        `,
        [email]
      );

      if (existsEmail.length > 0) {
        throw generateError(
          "There is already a registered user with this email address",
          409
        );
      }

      // Generate new regCode with uuidv4
      const regCode = uuidv4();

      // Write the body of the confirmation email
      const mailBody = `
      Su email de ChooseMovie ha sido modificado.
      Pulse en el siguiente enlace para validar dicha modificación.
      ${process.env.PUBLIC_HOST}validate/${regCode}
      Atentamente ChooseMovie.`;

      const htmlBody = `
      <section>
        <p>Su email de ChooseMovie ha sido modificado.</p>
        <p>Pulse en el siguiente enlace para validar dicha modificación.</p>
        <p>${process.env.PUBLIC_HOST}validate/${regCode}</p>
        <p>Atentamente ChooseMovie.</p>
      </section>
      `;

      // Send the confirmation email
      await sendMail(email, "Cambio de correo electrónico", mailBody, htmlBody);

      // Update email and set active
      await connection.query(
        `
          UPDATE users
          SET email = ?, active = false, regCode = ?
          WHERE id = ?
        `,
        [email, regCode, id]
      );
    }

    if (phone) {
      //  Check is not the same that old phone
      if (user_info[0].phone === phone) {
        throw generateError("You are already registered with this phone", 409);
      }

      // Update user
      await connection.query(
        `
          UPDATE users
          SET phone = ?
          WHERE id = ?
        `,
        [phone, id]
      );
    }
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { updateProfileQuery };
