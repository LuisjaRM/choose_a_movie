const { acceptFriend } = require("./acceptFriend");
const { acceptFriendByEmail } = require("./acceptFriendByEmail");
const { addFriend } = require("./addFriend");
const { deleteFriend } = require("./deleteFriend");
const { deleteUser } = require("./deleteUser");
const { getFriends } = require("./getFriends");
const { getNotifications } = require("./getNotifications");
const { getUserPrivateInfo } = require("./getUserPrivateInfo");
const { getUserPublicInfo } = require("./getUserPublicInfo");
const { getValidate } = require("./getValidate");
const { patchPassword } = require("./patchPassword");
const { patchUserInfo } = require("./patchUserInfo");
const { postLogin } = require("./postLogin");
const { postNewUser } = require("./postNewUser");
const { postRecoverPassword } = require("./postRecoverPassword");
const { postResetPassword } = require("./postResetPassword");
const { readNotification } = require("./readNotification");
const { searchFriend } = require("./searchFriend");

module.exports = {
  acceptFriend,
  acceptFriendByEmail,
  addFriend,
  deleteFriend,
  deleteUser,
  getFriends,
  getNotifications,
  getUserPrivateInfo,
  getUserPublicInfo,
  getValidate,
  patchPassword,
  patchUserInfo,
  postLogin,
  postNewUser,
  postRecoverPassword,
  postResetPassword,
  readNotification,
  searchFriend,
};
