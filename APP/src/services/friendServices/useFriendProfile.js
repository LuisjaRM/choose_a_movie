import { useGetData } from "../../hooks/useGetData";

export const useFriendProfile = (token, username) =>
  useGetData({
    token,
    url: `${import.meta.env.VITE_BACKEND}API/v1/friends/profile/${username}`,
  });
