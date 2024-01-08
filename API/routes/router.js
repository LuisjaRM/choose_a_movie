const express = require("express");

// Middlewares require
const { authUser, checkUser } = require("../middlewares/-export");

// Auth controllers require
const {
  login,
  recoverPassword,
  resetPassword,
  signup,
  validation,
} = require("../controllers/auth/-export");

// Films controllers require
const {
  addFilm,
  deleteFilm,
  deleteFilmsChecked,
  filmProfile,
  roomFilms,
  updateFilm,
} = require("../controllers/films/-export");

// Friends controllers require
const {
  acceptFriend,
  deleteFriend,
  friendProfile,
  requestRoom,
  searchFriend,
  sendFriendRequest,
  userFriends,
} = require("../controllers/friends/-export");

// Notifications controllers require
const {
  updateRead,
  userNotifications,
} = require("../controllers/notifications/-export");

// Users controllers require
const {
  changePassword,
  deleteUser,
  privateInfo,
  updateProfile,
} = require("../controllers/users/-export");

// Rooms controllers require
const {
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
} = require("../controllers/rooms/-export");

// Routes
const router = express.Router();

// Auth routes
router.post("/API/v1/auth/login", login);
router.post("/API/v1/auth/password/recovery", recoverPassword);
router.post("/API/v1/auth/password/resetting", resetPassword);
router.post("/API/v1/auth/signup", checkUser, signup);
router.get("/API/v1/auth/validation/:regCode", checkUser, validation);

// Films routes
router.post("/API/v1/films/:roomID", authUser, addFilm);
router.delete("/API/v1/films/film/:type/:filmID", authUser, deleteFilm);
router.get("/API/v1/films/:type/:filmID", authUser, filmProfile);
router.patch("/API/v1/films/update/:type/:filmID", authUser, updateFilm);
router.get("/API/v1/films/:roomID", authUser, roomFilms);
router.delete("/API/v1/films/checked/:type", authUser, deleteFilmsChecked);

// Friend routes
router.patch("/API/v1/friends/update/:item", authUser, acceptFriend);
router.delete("/API/v1/friends/:id", authUser, deleteFriend);
router.get("/API/v1/friends/profile/:username", authUser, friendProfile);
router.post("/API/v1/friends/update-rooms", authUser, requestRoom);
router.post("/API/v1/friends/search", authUser, searchFriend);
router.post("/API/v1/friends", authUser, sendFriendRequest);
router.get("/API/v1/friends", authUser, userFriends);

// Notifications routes
router.patch("/API/v1/notifications/:id", authUser, updateRead);
router.get("/API/v1/notifications", authUser, userNotifications);

// Users routes
router.patch("/API/v1/users/password", authUser, changePassword);
router.delete("/API/v1/users", authUser, deleteUser);
router.get("/API/v1/users/private-info", authUser, privateInfo);
router.patch("/API/v1/users/update", authUser, updateProfile);

// Room routes
router.patch("/API/v1/rooms/update-users/:title", authUser, acceptFriendRoom);
router.post("/API/v1/rooms", authUser, addRoom);
router.delete("/API/v1/rooms/room/:id", authUser, deleteRoom);
router.get("/API/v1/rooms/friends-rooms", authUser, friendsRooms);
router.delete(
  "/API/v1/rooms/friend/:friendID/:roomID",
  authUser,
  removeRoomFriend
);
router.get("/API/v1/rooms/profile/:id", authUser, roomProfile);
router.post("/API/v1/rooms/friends/search", authUser, searchFriendsRooms);
router.post("/API/v1/rooms/search", authUser, searchUserRooms);
router.patch("/API/v1/rooms/update/:id", authUser, updateRoom);
router.get("/API/v1/rooms", authUser, userRooms);

module.exports = router;
