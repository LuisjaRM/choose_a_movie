const { acceptFriendQuery } = require("./acceptFriendQuery");
const { friendProfileQuery } = require("./friendProfileQuery");
const { deleteFriendQuery } = require("./deleteFriendQuery");
const { requestRoomQuery } = require("./requestRoomQuery");
const { searchFriendQuery } = require("./searchFriendQuery");
const { sendFriendRequestQuery } = require("./sendFriendRequestQuery");
const { userFriendsQuery } = require("./userFriendsQuery");

module.exports = {
  acceptFriendQuery,
  friendProfileQuery,
  deleteFriendQuery,
  requestRoomQuery,
  searchFriendQuery,
  sendFriendRequestQuery,
  userFriendsQuery,
};
