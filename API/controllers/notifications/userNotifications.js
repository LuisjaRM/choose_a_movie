// Querie require
const {
  userNotificationsQuery,
} = require("../../database/queries/notifications/-export");

const userNotifications = async (req, res, next) => {
  try {
    const { id } = req.userInfo;

    // Query
    const notifications = await userNotificationsQuery(id);

    res.status(201).send({
      status: "ok",
      data: notifications,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { userNotifications };
