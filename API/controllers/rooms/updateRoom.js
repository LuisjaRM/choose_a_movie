// Joi require
const { updateRoomJoi } = require("../../jois/schemas");
// Services require
const { generateError } = require("../../services/generateError");
// Querie require
const { updateRoomQuery } = require("../../database/queries/rooms/-export");

const updateRoom = async (req, res, next) => {
  try {
    const { id } = req.params;
    const title = req.body.title === undefined ? null : req.body.title;

    let filesAvatar;
    try {
      filesAvatar = req.files.avatar;
    } catch (error) {
      filesAvatar = null;
    }

    if (!filesAvatar) {
      // Joi validation
      const schema = updateRoomJoi;
      const validation = schema.validate(req.body);

      if (validation.error) {
        throw generateError(validation.error.message, 401);
      }
    }

    // Query
    await updateRoomQuery(id, filesAvatar, title);

    res.status(201).send({
      status: "ok",
      message: "Modifications have been successfully carried out",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { updateRoom };
