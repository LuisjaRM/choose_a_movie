const { acceptRequestRoomQuery } = require("./acceptRequestRoomQuery");
const { acceptRoomQuery } = require("./acceptRoomQuery");
const { addFriendRoomQuery } = require("./addFriendRoomQuery");
const { addMovieQuery } = require("./addMovieQuery");
const { createRoomQuery } = require("./createRoomQuery");
const { deleteCheckedQuery } = require("./deleteCheckedQuery");
const { deleteFriendToRoomQuery } = require("./deleteFriendToRoomQuery");
const { deleteMovieQuery } = require("./deleteMovieQuery");
const { deleteRoomQuery } = require("./deleteRoomQuery");
const { getMoviesQuery } = require("./getMoviesQuery");
const { getMyRoomsQuery } = require("./getMyRoomsQuery");
const { getNotMyRoomsQuery } = require("./getNotMyRoomsQuery");
const { getSingleMovieQuery } = require("./getSingleMovieQuery");
const { getSingleRoomQuery } = require("./getSingleRoomQuery");
const { patchIsCheckQuery } = require("./patchIsCheckQuery");
const { patchMovieQuery } = require("./patchMovieQuery");
const { patchOrderValueQuery } = require("./patchOrderValueQuery");
const { patchPostAvatarQuery } = require("./patchPostAvatarQuery");
const { patchRoomAvatarQuery } = require("./patchRoomAvatarQuery");
const { patchRoomTitleQuery } = require("./patchRoomTitleQuery");
const { searchMyRoomQuery } = require("./searchMyRoomQuery");
const { searchNotMyRoomQuery } = require("./searchNotMyRoomQuery");
const { sendRequestRoomQuery } = require("./sendRequestRoomQuery");

module.exports = {
  acceptRequestRoomQuery,
  acceptRoomQuery,
  addFriendRoomQuery,
  addMovieQuery,
  createRoomQuery,
  deleteCheckedQuery,
  deleteFriendToRoomQuery,
  deleteMovieQuery,
  deleteRoomQuery,
  getMoviesQuery,
  getMyRoomsQuery,
  getNotMyRoomsQuery,
  getSingleMovieQuery,
  getSingleRoomQuery,
  patchIsCheckQuery,
  patchMovieQuery,
  patchOrderValueQuery,
  patchPostAvatarQuery,
  patchRoomAvatarQuery,
  patchRoomTitleQuery,
  searchMyRoomQuery,
  searchNotMyRoomQuery,
  sendRequestRoomQuery,
};
