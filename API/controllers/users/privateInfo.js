// Querie require
const { privateInfoQuery } = require("../../database/queries/users/-export");

const privateInfo = async (req, res, next) => {
  try {
    const { id } = req.userInfo;

    // Query
    const user_info = await privateInfoQuery(id);

    res.status(201).send({
      status: "ok",
      data: user_info,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { privateInfo };
