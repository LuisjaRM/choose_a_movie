// Requires
const Joi = require("joi");
const { joiPasswordExtendCore } = require("joi-password");
const joiPassword = Joi.extend(joiPasswordExtendCore);

const newUserJoi = joiPassword.object().keys({
  username: joiPassword.string().min(4).max(15).noWhiteSpaces().required(),
  email: joiPassword.string().email().required(),
  password: joiPassword
    .string()
    .min(8)
    .max(20)
    .noWhiteSpaces()
    .minOfSpecialCharacters(1)
    .minOfUppercase(1)
    .minOfNumeric(1)
    .required(),
});

const resetPasswordJoi = joiPassword.object().keys({
  recoverCode: joiPassword.required(),
  newPassword: joiPassword
    .string()
    .min(8)
    .max(20)
    .noWhiteSpaces()
    .minOfSpecialCharacters(1)
    .minOfUppercase(1)
    .minOfNumeric(1)
    .required(),
});

const patchPasswordJoi = joiPassword.object().keys({
  oldPassword: joiPassword.required(),
  newPassword: joiPassword
    .string()
    .min(8)
    .max(20)
    .noWhiteSpaces()
    .minOfSpecialCharacters(1)
    .minOfUppercase(1)
    .minOfNumeric(1)
    .required(),
});

const patchUserJoi = joiPassword.object().keys({
  username: joiPassword.string().min(4).max(15).noWhiteSpaces(),
  email: joiPassword.string().email(),
  phone: joiPassword.string().regex(/^[0-9]{9}$/),
});

const createRoomJoi = joiPassword.object().keys({
  roomName: joiPassword.string().min(4).max(15).required(),
});

const editRoomJoi = joiPassword.object().keys({
  title: joiPassword.string().min(4).max(15).required(),
});

const addMovieJoi = joiPassword.object().keys({
  title: joiPassword.string().max(30).required(),
  url: joiPassword.string().uri().allow("").max(280),
  plataform: joiPassword.string(),
  type: joiPassword.string(),
});

const editMovieJoi = joiPassword.object().keys({
  title: joiPassword.string().max(30),
  url: joiPassword.string().uri().allow("").max(280),
  plataform: joiPassword.string(),
  type: joiPassword.string(),
});

module.exports = {
  newUserJoi,
  resetPasswordJoi,
  patchPasswordJoi,
  patchUserJoi,
  createRoomJoi,
  editRoomJoi,
  addMovieJoi,
  editMovieJoi,
};
