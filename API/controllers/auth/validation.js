// Querie require
const { validationQuery } = require("../../database/queries/auth/-export");

const validation = async (req, res, next) => {
  try {
    const { regCode } = req.params;

    // Querie
    await validationQuery(regCode);

    res.status(200).send({
      status: "ok",
      message: `User activate`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { validation };
