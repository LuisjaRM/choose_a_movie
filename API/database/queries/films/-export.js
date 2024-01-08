const { addFilmQuery } = require("./addFilmQuery");
const { deleteFilmQuery } = require("./deleteFilmQuery");
const { deleteFilmsCheckedQuery } = require("./deleteFilmsCheckedQuery");
const { filmProfileQuery } = require("./filmProfileQuery");
const { roomFilmsQuery } = require("./roomFilmsQuery");
const { updateFilmQuery } = require("./updateFilmQuery");

module.exports = {
  addFilmQuery,
  deleteFilmQuery,
  deleteFilmsCheckedQuery,
  filmProfileQuery,
  roomFilmsQuery,
  updateFilmQuery,
};
