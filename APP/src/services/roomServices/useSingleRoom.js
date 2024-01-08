import { useGetData } from "../../hooks/useGetData";

export const useSingleRoom = (token, roomID) =>
  useGetData({
    token,
    url: `${import.meta.env.VITE_BACKEND}API/v1/rooms/profile/${roomID}`,
  });
