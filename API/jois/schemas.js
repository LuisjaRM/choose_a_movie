// Requires
const Joi = require("joi");
const { joiPasswordExtendCore } = require("joi-password");
const joiPassword = Joi.extend(joiPasswordExtendCore);

const addFilmJoi = joiPassword.object().keys({
  title: joiPassword.string().max(30).required(),
  url: joiPassword.string().uri().allow("").max(280),
  platform: joiPassword.string(),
  type: joiPassword.string(),
});

const addRoomJoi = joiPassword.object().keys({
  title: joiPassword.string().min(4).max(15).required(),
});

const changePasswordJoi = joiPassword.object().keys({
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
  repeatPassword: joiPassword.string(),
});

const signupJoi = joiPassword.object().keys({
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
  repeatPassword: joiPassword.string(),
});

const updateFilmJoi = joiPassword.object().keys({
  title: joiPassword.string().max(30),
  url: joiPassword.string().uri().allow("").max(280),
  platform: joiPassword.string(),
  type: joiPassword.string(),
  checkOrDescheck: joiPassword.string(),
  upOrdown: joiPassword.string(),
});

const updateProfileJoi = joiPassword.object().keys({
  username: joiPassword.string().min(4).max(15).noWhiteSpaces(),
  email: joiPassword.string().email(),
  phone: joiPassword.string().regex(/^[0-9]{9}$/),
});

const updateRoomJoi = joiPassword.object().keys({
  title: joiPassword.string().min(4).max(15),
});

module.exports = {
  addFilmJoi,
  addRoomJoi,
  changePasswordJoi,
  resetPasswordJoi,
  signupJoi,
  updateFilmJoi,
  updateProfileJoi,
  updateRoomJoi,
};
