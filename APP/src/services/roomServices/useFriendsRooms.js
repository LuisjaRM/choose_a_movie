import { useGetData } from "../../hooks/useGetData";

export const useFriendsRooms = (token) =>
  useGetData({
    token,
    url: `${import.meta.env.VITE_BACKEND}API/v1/rooms/friends-rooms`,
  });
