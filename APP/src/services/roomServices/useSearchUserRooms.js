import { useGetSearch } from "../../hooks/useGetSearch";

export const useSearchUserRooms = (token, { search }) =>
  useGetSearch({
    token,
    url: `${import.meta.env.VITE_BACKEND}API/v1/rooms/search/${search}`,
    search,
  });
