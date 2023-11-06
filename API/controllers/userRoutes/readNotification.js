// Querie require
const {
  readNotificationQuery,
} = require("../../database/queries/userRoutes/-exportQueries");

const readNotification = async (req, res, next) => {
  try {
    const { id } = req.params;

    await readNotificationQuery(id);

    res.status(201).send({
      status: "ok",
      message: `Notification marked as read`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { readNotification };
