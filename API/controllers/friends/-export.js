const { acceptFriend } = require("./acceptFriend");
const { friendProfile } = require("./friendProfile");
const { deleteFriend } = require("./deleteFriend");
const { requestRoom } = require("./requestRoom");
const { searchFriend } = require("./searchFriend");
const { sendFriendRequest } = require("./sendFriendRequest");
const { userFriends } = require("./userFriends");

module.exports = {
  acceptFriend,
  friendProfile,
  deleteFriend,
  requestRoom,
  searchFriend,
  sendFriendRequest,
  userFriends,
};
