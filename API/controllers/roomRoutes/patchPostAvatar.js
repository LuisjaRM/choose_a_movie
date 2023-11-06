// Querie require
const {
  patchPostAvatarQuery,
} = require("../../database/queries/roomRoutes/-exportQueries");

const patchPostAvatar = async (req, res, next) => {
  try {
    const { type, id } = req.params;
    const filesAvatar = req.files.avatar;

    // Query:
    await patchPostAvatarQuery({ type, id, filesAvatar });

    // Res.send
    res.status(201).send({
      status: "ok",
      message: "Modifications have been successfully carried out",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { patchPostAvatar };
