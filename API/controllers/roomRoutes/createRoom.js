// Services require
const { generateError } = require("../../services/generateError");

// Joi require
const { createRoomJoi } = require("../../jois/schemas");

// Query require
const {
  createRoomQuery,
} = require("../../database/queries/roomRoutes/-exportQueries");

const createRoom = async (req, res, next) => {
  try {
    const { id } = req.userInfo;
    const { roomName } = req.body;

    // Joi validation
    const schema = createRoomJoi;
    const validation = schema.validate(req.body);

    if (validation.error) {
      throw generateError(validation.error.message, 401);
    }

    // Query: Create new user
    const data = await createRoomQuery(id, roomName);

    // Res.send
    res.status(201).send({
      status: "ok",
      message: `Room with id (${data.id}) successfully registered`,
      data: data,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { createRoom };
