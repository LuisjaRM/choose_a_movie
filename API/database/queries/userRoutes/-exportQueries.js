const { acceptFriendQuery } = require("./acceptFriendQuery");
const { acceptFriendByEmailQuery } = require("./acceptFriendByEmailQuery");
const { addFriendQuery } = require("./addFriendQuery");
const { deleteFriendQuery } = require("./deleteFriendQuery");
const { deleteUserQuery } = require("./deleteUserQuery");
const { getFriendsQuery } = require("./getFriendsQuery");
const { getNotificationsQuery } = require("./getNotificationsQuery");
const { getUserPrivateInfoQuery } = require("./getUserPrivateInfoQuery");
const { getUserPublicInfoQuery } = require("./getUserPublicInfoQuery");
const { getValidateQuery } = require("./getValidateQuery");
const { patchPasswordQuery } = require("./patchPasswordQuery");
const { patchUserInfoQuery } = require("./patchUserInfoQuery");
const { postLoginQuery } = require("./postLoginQuery");
const { postNewUserQuery } = require("./postNewUserQuery");
const { postRecoverPasswordQuery } = require("./postRecoverPasswordQuery");
const { postResetPasswordQuery } = require("./postResetPasswordQuery");
const { readNotificationQuery } = require("./readNotificationQuery");
const { searchFriendQuery } = require("./searchFriendQuery");

module.exports = {
  acceptFriendQuery,
  acceptFriendByEmailQuery,
  addFriendQuery,
  deleteFriendQuery,
  deleteUserQuery,
  getFriendsQuery,
  getNotificationsQuery,
  getUserPrivateInfoQuery,
  getUserPublicInfoQuery,
  getValidateQuery,
  patchPasswordQuery,
  patchUserInfoQuery,
  postLoginQuery,
  postNewUserQuery,
  postRecoverPasswordQuery,
  postResetPasswordQuery,
  readNotificationQuery,
  searchFriendQuery,
};
