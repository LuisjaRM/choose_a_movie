// Querie require
const { deleteUserQuery } = require("../../database/queries/users/-export");

const deleteUser = async (req, res, next) => {
  try {
    const id = req.userInfo.id;

    // Querie
    await deleteUserQuery(id);

    res.status(200).send({
      status: "ok",
      message: `User successfully deleted`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { deleteUser };
