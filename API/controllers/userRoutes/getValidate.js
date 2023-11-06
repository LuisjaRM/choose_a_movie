// Querie require
const {
  getValidateQuery,
} = require("../../database/queries/userRoutes/-exportQueries");

const getValidate = async (req, res, next) => {
  try {
    const { regCode } = req.params;

    // Activate the user
    await getValidateQuery(regCode);

    res.status(200).send({
      status: "ok",
      message: `User validated`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getValidate };
