// Querie require
const {
  deleteUserQuery,
} = require("../../database/queries/userRoutes/-exportQueries");

const deleteUser = async (req, res, next) => {
  try {
    const id = req.userInfo.id;

    await deleteUserQuery(id);

    // Res.send
    res.status(200).send({
      status: "ok",
      message: `User successfully deleted`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { deleteUser };
