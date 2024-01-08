import { useGetData } from "../../hooks/useGetData";

export const useUserNotifications = (token) =>
  useGetData({
    token,
    url: `${import.meta.env.VITE_BACKEND}API/v1/notifications`,
  });
