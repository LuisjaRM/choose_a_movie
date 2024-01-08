import { useGetData } from "../../hooks/useGetData";

export const useRoomFilms = (token, roomID) =>
  useGetData({
    token,
    url: `${import.meta.env.VITE_BACKEND}API/v1/films/${roomID}`,
  });
