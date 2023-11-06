// Querie require
const {
  patchRoomAvatarQuery,
} = require("../../database/queries/roomRoutes/-exportQueries");

const patchRoomAvatar = async (req, res, next) => {
  try {
    const { id } = req.params;
    const filesAvatar = req.files.avatar;

    // Query:
    await patchRoomAvatarQuery({ id, filesAvatar });

    // Res.send
    res.status(201).send({
      status: "ok",
      message: "Modifications have been successfully carried out",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { patchRoomAvatar };
