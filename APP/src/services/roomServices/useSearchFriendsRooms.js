import { useGetSearch } from "../../hooks/useGetSearch";

export const useSearchFriendsRooms = (token, { search }) =>
  useGetSearch({
    token,
    url: `${import.meta.env.VITE_BACKEND}API/v1/rooms/friends/search/${search}`,
    search,
  });
