import { useGetData } from "../../hooks/useGetData";

export const useUserFriends = (token) =>
  useGetData({
    token,
    url: `${import.meta.env.VITE_BACKEND}API/v1/friends`,
  });
