const express = require("express");

// Middlewares require
const {
  authUser,
  checkIfUserExists,
} = require("../middlewares/-exportMiddlewares");

// Users controllers require
const {
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
} = require("../controllers/userRoutes/-exportControllers");

// Rooms controllers require
const {
  acceptRequestRoom,
  acceptRoom,
  addFriendRoom,
  addMovie,
  createRoom,
  deleteChecked,
  deleteFriendToRoom,
  deleteMovie,
  deleteRoom,
  getMovies,
  getMyRooms,
  getNotMyRooms,
  getSingleMovie,
  getSingleRoom,
  patchIsCheck,
  patchMovie,
  patchOrderValue,
  patchRoomAvatar,
  patchRoomTitle,
  patchPostAvatar,
  searchMyRoom,
  searchNotMyRoom,
  sendRequestRoom,
} = require("../controllers/roomRoutes/-exportControllers");

// Routes
const router = express.Router();

// User routes
router.post("/new-user", checkIfUserExists, postNewUser);
router.get("/validate/:regCode", checkIfUserExists, getValidate);
router.post("/login", postLogin);
router.post("/recover-password", postRecoverPassword);
router.post("/reset-password", postResetPassword);
router.patch("/set-password", authUser, patchPassword);
router.get("/my-profile", authUser, getUserPrivateInfo);
router.patch("/edit-profile", authUser, patchUserInfo);
router.delete("/delete-user", authUser, deleteUser);
router.post("/add-friend", authUser, addFriend);
router.get("/get-notifications", authUser, getNotifications);
router.patch("/read-notification/:id", authUser, readNotification);
router.patch("/accept-friend/:username", authUser, acceptFriend);
router.patch("/accept-email-friend/:regCode", authUser, acceptFriendByEmail);
router.get("/get-friends", authUser, getFriends);
router.post("/search-friend", authUser, searchFriend);
router.get("/user-profile/:username", authUser, getUserPublicInfo);
router.delete("/delete-friend/:id", authUser, deleteFriend);

// Room routes
router.post("/create-room", authUser, createRoom);
router.patch("/room-avatar/:id", authUser, patchRoomAvatar);
router.post("/add-friend-room", authUser, addFriendRoom);
router.patch("/accept-room/:room", authUser, acceptRoom);
router.get("/get-my-rooms", authUser, getMyRooms);
router.post("/search-my-room", authUser, searchMyRoom);
router.get("/get-not-my-rooms", authUser, getNotMyRooms);
router.post("/search-not-my-room", authUser, searchNotMyRoom);
router.post("/request-room", authUser, sendRequestRoom);
router.patch("/accept-request/:room", authUser, acceptRequestRoom);
router.get("/get-room/:title", authUser, getSingleRoom);
router.delete(
  "/delete-friend-to-room/:user/:room",
  authUser,
  deleteFriendToRoom
);
router.patch("/set-room-title/:roomID", authUser, patchRoomTitle);
router.post("/add-movie/:roomID", authUser, addMovie);
router.patch("/post-avatar/:type/:id", authUser, patchPostAvatar);
router.get("/get-movies/:roomID", authUser, getMovies);
router.get("/get-movie/:type/:movieID", authUser, getSingleMovie);
router.patch("/set-movie/:type/:movieID", authUser, patchMovie);
router.patch("/set-order-value/:type/:movieID", authUser, patchOrderValue);
router.patch("/set-is-check/:type/:movieID", authUser, patchIsCheck);
router.patch("/delete-checked/:type", authUser, deleteChecked);
router.patch("/delete-movie/:type/:movieID", authUser, deleteMovie);
router.patch("/delete-room/:roomTitle", authUser, deleteRoom);

module.exports = router;
