const { acceptFriendRoomQuery } = require("./acceptFriendRoomQuery");
const { addRoomQuery } = require("./addRoomQuery");
const { deleteRoomQuery } = require("./deleteRoomQuery");
const { friendsRoomsQuery } = require("./friendsRoomsQuery");
const { removeRoomFriendQuery } = require("./removeRoomFriendQuery");
const { roomProfileQuery } = require("./roomProfileQuery");
const { searchFriendsRoomsQuery } = require("./searchFriendsRoomsQuery");
const { searchUserRoomsQuery } = require("./searchUserRoomsQuery");
const { updateRoomQuery } = require("./updateRoomQuery");
const { userRoomsQuery } = require("./userRoomsQuery");

module.exports = {
  acceptFriendRoomQuery,
  addRoomQuery,
  deleteRoomQuery,
  friendsRoomsQuery,
  removeRoomFriendQuery,
  roomProfileQuery,
  searchFriendsRoomsQuery,
  searchUserRoomsQuery,
  updateRoomQuery,
  userRoomsQuery,
};
