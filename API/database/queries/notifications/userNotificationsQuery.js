// Connection require
const { getConnection } = require("../../connection");

const userNotificationsQuery = async (id) => {
  let connection;

  try {
    connection = await getConnection();

    const [notifications] = await connection.query(
      `
        SELECT u.username, u.avatar, n.id, n.message, n.readed, n.date
        FROM notifications n
        INNER JOIN users u ON n.host_id = u.id
        WHERE n.guest_id = ?
        ORDER BY n.id DESC
      `,
      [id]
    );

    return notifications;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = { userNotificationsQuery };
