// Services require
const { generateError } = require("../../services/generateError");

// Joi require
const { patchUserJoi } = require("../../jois/schemas");

// Querie require
const {
  patchUserInfoQuery,
} = require("../../database/queries/userRoutes/-exportQueries");

const patchUserInfo = async (req, res, next) => {
  try {
    const id = req.userInfo.id;
    const username = req.body.username === undefined ? null : req.body.username;
    const email = req.body.email === undefined ? null : req.body.email;
    const phone = req.body.phone === undefined ? null : req.body.phone;

    let filesAvatar;
    try {
      filesAvatar = req.files.avatar;
    } catch (error) {
      filesAvatar = null;
    }

    if (!filesAvatar) {
      // Joi validation
      const schema = patchUserJoi;
      const validation = schema.validate(req.body);

      if (validation.error) {
        throw generateError(validation.error.message, 401);
      }
    }

    // Query:
    await patchUserInfoQuery({ id, filesAvatar, username, email, phone });

    // Res.send
    res.status(201).send({
      status: "ok",
      message: "Modifications have been successfully carried out",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { patchUserInfo };
