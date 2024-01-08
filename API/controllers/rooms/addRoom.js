// Joi require
const { addRoomJoi } = require("../../jois/schemas");
// Services require
const { generateError } = require("../../services/generateError");
// Query require
const { addRoomQuery } = require("../../database/queries/rooms/-export");

const addRoom = async (req, res, next) => {
  try {
    const { id } = req.userInfo;
    const { title } = req.body;

    // Joi validation
    const schema = addRoomJoi;
    const validation = schema.validate(req.body);

    if (validation.error) {
      throw generateError(validation.error.message, 401);
    }

    // Query
    const data = await addRoomQuery(id, title);

    res.status(201).send({
      status: "ok",
      message: `Room with id (${data.id}) successfully registered`,
      data: data,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { addRoom };
