import { useGetData } from "../../hooks/useGetData";

export const useGetUserPrivateInfo = (token) =>
  useGetData({
    token,
    url: `${import.meta.env.VITE_BACKEND}my-profile`,
  });

export const useGetUserPublicInfo = (token, username) =>
  useGetData({
    token,
    url: `${import.meta.env.VITE_BACKEND}user-profile/${username}`,
  });

export const useGetFriends = (token) =>
  useGetData({
    token,
    url: `${import.meta.env.VITE_BACKEND}get-friends`,
  });

export const useGetNotifications = (token) =>
  useGetData({
    token,
    url: `${import.meta.env.VITE_BACKEND}get-notifications`,
  });

export const useGetMyRooms = (token) =>
  useGetData({
    token,
    url: `${import.meta.env.VITE_BACKEND}get-my-rooms`,
  });

export const useGetNotMyRooms = (token) =>
  useGetData({
    token,
    url: `${import.meta.env.VITE_BACKEND}get-not-my-rooms`,
  });

export const useGetSingleRoom = ({ token, roomTitle }) =>
  useGetData({
    token,
    url: `${import.meta.env.VITE_BACKEND}get-room/${roomTitle}`,
  });

export const useGetMovies = ({ token, roomID }) =>
  useGetData({
    token,
    url: `${import.meta.env.VITE_BACKEND}get-movies/${roomID}`,
  });

export const useGetSingleMovie = ({ token, type, movieID }) =>
  useGetData({
    token,
    url: `${import.meta.env.VITE_BACKEND}get-movie/${type}/${movieID}`,
  });
