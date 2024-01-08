const { acceptFriendRoom } = require("./acceptFriendRoom");
const { addRoom } = require("./addRoom");
const { deleteRoom } = require("./deleteRoom");
const { friendsRooms } = require("./friendsRooms");
const { removeRoomFriend } = require("./removeRoomFriend");
const { roomProfile } = require("./roomProfile");
const { searchFriendsRooms } = require("./searchFriendsRooms");
const { searchUserRooms } = require("./searchUserRooms");
const { updateRoom } = require("./updateRoom");
const { userRooms } = require("./userRooms");

module.exports = {
  acceptFriendRoom,
  addRoom,
  deleteRoom,
  friendsRooms,
  removeRoomFriend,
  roomProfile,
  searchFriendsRooms,
  searchUserRooms,
  updateRoom,
  userRooms,
};
