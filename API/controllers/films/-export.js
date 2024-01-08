const { addFilm } = require("./addFilm");
const { deleteFilm } = require("./deleteFilm");
const { deleteFilmsChecked } = require("./deleteFilmsChecked");
const { filmProfile } = require("./filmProfile");
const { roomFilms } = require("./roomFilms");
const { updateFilm } = require("./updateFilm");

module.exports = {
  addFilm,
  deleteFilm,
  deleteFilmsChecked,
  filmProfile,
  roomFilms,
  updateFilm,
};
