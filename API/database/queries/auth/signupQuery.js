// Connection require
const { getConnection } = require("../../connection");
// npm requires
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
// Services requires
const { sendMail } = require("../../../services/sendMail");

const signupQuery = async (email, password, username) => {
  let connection;
  try {
    connection = await getConnection();

    // Generate new regCode with uuidv4
    const regCode = uuidv4();

    // Write the body of the confirmation email
    const mailBody = `
    Se ha completado con éxito tu formulario de registro.
    ¡Estamos encantados de tenerte con nosotros!.
    Haz click en el siguiente enlace para activar tu cuenta.
    ${process.env.PUBLIC_HOST}validate/${regCode}
    Atentamente ChooseMovie.`;

    const htmlBody = `
    <section>
      <p>Se ha completado con éxito tu formulario de registro. ¡Estamos encantados de tenerte con nosotros!.</p>
      <p>Haz click en el siguiente enlace para activar tu cuenta.</p>
      <p>${process.env.PUBLIC_HOST}validate/${regCode}</p>
      <p>Atentamente ChooseMovie.</p>
    </section>
    `;

    // Send the confirmation email
    await sendMail(email, "Correo de verificación", mailBody, htmlBody);

    // Crypt password
    const passwordHash = await bcrypt.hash(password, 8);

    // Create a new user
    const [newUser] = await connection.query(
      `INSERT INTO users (email, password, username, regCode) VALUES(?, ?, ?, ?)`,
      [email, passwordHash, username, regCode]
    );

    // Return new user ID
    return (info = { id: newUser.insertId, regCode });
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { signupQuery };
