// Querie require
const {
  getNotificationsQuery,
} = require("../../database/queries/userRoutes/-exportQueries");

const getNotifications = async (req, res, next) => {
  try {
    const { id } = req.userInfo;

    // Get notifications of the user
    const notifications = await getNotificationsQuery(id);

    res.status(201).send({
      status: "ok",
      data: notifications,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getNotifications };
