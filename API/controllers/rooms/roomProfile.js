// Querie require
const { roomProfileQuery } = require("../../database/queries/rooms/-export");

const roomProfile = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Query
    const room = await roomProfileQuery(id);

    res.status(201).send({
      status: "ok",
      data: room,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { roomProfile };
