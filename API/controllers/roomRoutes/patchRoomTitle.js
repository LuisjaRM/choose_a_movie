// Services require
const { generateError } = require("../../services/generateError");

// Joi require
const { editRoomJoi } = require("../../jois/schemas");

// Querie require
const {
  patchRoomTitleQuery,
} = require("../../database/queries/roomRoutes/-exportQueries");

const patchRoomTitle = async (req, res, next) => {
  try {
    const { roomID } = req.params;
    const { title } = req.body;

    // Joi validation
    const schema = editRoomJoi;
    const validation = schema.validate(req.body);

    if (validation.error) {
      throw generateError(validation.error.message, 401);
    }

    // Query:
    await patchRoomTitleQuery({ roomID, title });

    // Res.send
    res.status(201).send({
      status: "ok",
      message: "Modifications have been successfully carried out",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { patchRoomTitle };
