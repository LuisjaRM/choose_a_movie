import { useGetData } from "../../hooks/useGetData";

export const useSingleFilm = (token, { type, filmID }) =>
  useGetData({
    token,
    url: `${import.meta.env.VITE_BACKEND}API/v1/films/${type}/${filmID}`,
  });
